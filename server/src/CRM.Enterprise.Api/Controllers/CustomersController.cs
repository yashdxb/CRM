using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Customers;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Customers;
using CRM.Enterprise.Application.Tenants;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ApiUpsertCustomerRequest = CRM.Enterprise.Api.Contracts.Customers.UpsertCustomerRequest;
using AppCustomerUpsertRequest = CRM.Enterprise.Application.Customers.CustomerUpsertRequest;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.CustomersView)]
[ApiController]
[Route("api/customers")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;
    private readonly ICustomerImportService _customerImportService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public CustomersController(
        ICustomerService customerService,
        ICustomerImportService customerImportService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _customerService = customerService;
        _customerImportService = customerImportService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerSearchResponse>> GetCustomers(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? sortBy = null,
        [FromQuery] string? sortDirection = null,
        [FromQuery] string? industry = null,
        [FromQuery] string? territory = null,
        [FromQuery] Guid? ownerId = null,
        [FromQuery] DateTime? createdFrom = null,
        [FromQuery] DateTime? createdTo = null,
        [FromQuery] decimal? minRevenue = null,
        [FromQuery] decimal? maxRevenue = null,
        CancellationToken cancellationToken = default)
    {
        var result = await _customerService.SearchAsync(
            new CustomerSearchRequest(search, status, page, pageSize, sortBy, sortDirection,
                industry, territory, ownerId, createdFrom, createdTo, minRevenue, maxRevenue),
            cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new CustomerSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CustomerListItem>> GetCustomer(Guid id, CancellationToken cancellationToken)
    {
        var customer = await _customerService.GetAsync(id, cancellationToken);
        if (customer is null) return NotFound();
        return Ok(ToApiItem(customer));
    }

    [HttpGet("{id:guid}/related-accounts")]
    public async Task<ActionResult<IEnumerable<CustomerListItem>>> GetRelatedAccounts(Guid id, CancellationToken cancellationToken)
    {
        var related = await _customerService.GetRelatedAccountsAsync(id, cancellationToken);
        var items = related.Select(ToApiItem);
        return Ok(items);
    }

    [HttpGet("{id:guid}/detail")]
    public async Task<ActionResult<CustomerDetail>> GetCustomerDetail(Guid id, CancellationToken cancellationToken)
    {
        var detail = await _customerService.GetDetailAsync(id, cancellationToken);
        if (detail is null) return NotFound();
        return Ok(ToApiDetail(detail));
    }

    [HttpGet("{id:guid}/team-members")]
    public async Task<ActionResult<IEnumerable<AccountTeamMemberItem>>> GetTeamMembers(Guid id, CancellationToken cancellationToken)
    {
        var members = await _customerService.GetTeamMembersAsync(id, cancellationToken);
        return Ok(members.Select(m => new AccountTeamMemberItem(m.Id, m.UserId, m.UserName, m.Role, m.CreatedAtUtc)));
    }

    [HttpPost("{id:guid}/team-members")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<ActionResult<AccountTeamMemberItem>> AddTeamMember(Guid id, [FromBody] AddTeamMemberRequest request, CancellationToken cancellationToken)
    {
        if (request.UserId == Guid.Empty || string.IsNullOrWhiteSpace(request.Role))
            return BadRequest("UserId and Role are required.");

        var result = await _customerService.AddTeamMemberAsync(id, request.UserId, request.Role, cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var m = result.Value!;
        return CreatedAtAction(nameof(GetTeamMembers), new { id }, new AccountTeamMemberItem(m.Id, m.UserId, m.UserName, m.Role, m.CreatedAtUtc));
    }

    [HttpDelete("{id:guid}/team-members/{memberId:guid}")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<IActionResult> RemoveTeamMember(Guid id, Guid memberId, CancellationToken cancellationToken)
    {
        var result = await _customerService.RemoveTeamMemberAsync(id, memberId, cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<ActionResult<CustomerListItem>> Create([FromBody] ApiUpsertCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        await PublishCustomerRealtimeAsync("created", result.Value!.Id, cancellationToken);
        return CreatedAtAction(nameof(GetCustomer), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPost("import")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<ActionResult<CsvImportResult>> Import([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _customerImportService.ImportAsync(stream, GetActor(), cancellationToken);
        var errors = result.Errors.Select(error => new CsvImportError(error.RowNumber, error.Message)).ToList();
        return Ok(new CsvImportResult(result.Total, result.Imported, result.Failed, errors));
    }

    [HttpPost("import/queue")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<ActionResult<ImportJobResponse>> QueueImport([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _customerImportService.QueueImportAsync(stream, file.FileName, GetActor(), cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        await PublishImportProgressAsync(value.ImportJobId, value.EntityType, value.Status, 0, 0, 0, 0, null, cancellationToken);
        return Accepted(new ImportJobResponse(value.ImportJobId, value.EntityType, value.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ApiUpsertCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishCustomerRealtimeAsync("updated", id, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _customerService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishCustomerRealtimeAsync("deleted", id, cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _customerService.UpdateOwnerAsync(id, request.OwnerId, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/lifecycle")]
    public async Task<IActionResult> UpdateLifecycle(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var result = await _customerService.UpdateLifecycleAsync(id, request.Status, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<IActionResult> BulkAssignOwner([FromBody] BulkAssignOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No customer ids provided.");
        }

        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _customerService.BulkAssignOwnerAsync(request.Ids, request.OwnerId, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-update-lifecycle")]
    [Authorize(Policy = Permissions.Policies.CustomersManage)]
    public async Task<IActionResult> BulkUpdateLifecycle([FromBody] BulkUpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No customer ids provided.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var result = await _customerService.BulkUpdateLifecycleAsync(request.Ids, request.Status, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("check-duplicate")]
    [Authorize(Policy = Permissions.Policies.CustomersView)]
    public async Task<ActionResult<DuplicateCheckResponse>> CheckDuplicate(
        [FromBody] DuplicateCheckRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerService.CheckDuplicateAsync(
            request.Name, request.AccountNumber, request.Website, request.Phone,
            request.ExcludeId, cancellationToken);

        return Ok(new DuplicateCheckResponse(result.IsDuplicate, result.MatchId, result.MatchName));
    }

    private static CustomerListItem ToApiItem(CustomerListItemDto dto)
    {
        return new CustomerListItem(
            dto.Id,
            dto.Name,
            dto.DisplayName,
            dto.Email,
            dto.Phone,
            dto.Status,
            dto.OwnerId,
            dto.OwnerName,
            dto.ParentAccountId,
            dto.ParentAccountName,
            dto.CreatedAtUtc,
            dto.Industry,
            dto.Territory,
            dto.ActivityScore,
            dto.Website,
            dto.AccountNumber,
            dto.AnnualRevenue,
            dto.NumberOfEmployees,
            dto.AccountType,
            dto.Rating,
            dto.AccountSource);
    }

    private static CustomerDetail ToApiDetail(CustomerDetailDto dto)
    {
        return new CustomerDetail(
            dto.Id,
            dto.Name,
            dto.AccountNumber,
            dto.Industry,
            dto.Website,
            dto.Phone,
            dto.Status,
            dto.OwnerId,
            dto.OwnerName,
            dto.ParentAccountId,
            dto.ParentAccountName,
            dto.Territory,
            dto.Description,
            dto.ActivityScore,
            dto.HealthScore,
            dto.LastActivityAtUtc,
            dto.LastViewedAtUtc,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc,
            dto.AnnualRevenue,
            dto.NumberOfEmployees,
            dto.AccountType,
            dto.Rating,
            dto.AccountSource,
            dto.BillingStreet,
            dto.BillingCity,
            dto.BillingState,
            dto.BillingPostalCode,
            dto.BillingCountry,
            dto.ShippingStreet,
            dto.ShippingCity,
            dto.ShippingState,
            dto.ShippingPostalCode,
            dto.ShippingCountry,
            dto.ContactCount,
            dto.OpportunityCount,
            dto.LeadCount,
            dto.SupportCaseCount,
            dto.TeamMembers.Select(m => new AccountTeamMemberItem(m.Id, m.UserId, m.UserName, m.Role, m.CreatedAtUtc)));
    }

    private static AppCustomerUpsertRequest MapUpsertRequest(ApiUpsertCustomerRequest request)
    {
        return new AppCustomerUpsertRequest(
            request.Name,
            request.AccountNumber,
            request.Industry,
            request.Website,
            request.Phone,
            request.LifecycleStage,
            request.OwnerId,
            request.ParentAccountId,
            request.Territory,
            request.Description,
            request.AnnualRevenue,
            request.NumberOfEmployees,
            request.AccountType,
            request.Rating,
            request.AccountSource,
            request.BillingStreet,
            request.BillingCity,
            request.BillingState,
            request.BillingPostalCode,
            request.BillingCountry,
            request.ShippingStreet,
            request.ShippingCity,
            request.ShippingState,
            request.ShippingPostalCode,
            request.ShippingCountry);
    }

    private ActorContext GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = User.FindFirstValue(ClaimTypes.Name);
        var parsed = Guid.TryParse(id, out var value) ? value : (Guid?)null;
        return new ActorContext(parsed, name);
    }

    private Task PublishCustomerRealtimeAsync(string action, Guid customerId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "entity.crud.changed",
            new
            {
                entityType = "Customer",
                entityId = customerId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private Task PublishImportProgressAsync(
        Guid jobId,
        string entityType,
        string status,
        int processed,
        int total,
        int succeeded,
        int failed,
        string? errorSummary,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "import.job.progress",
            new
            {
                jobId,
                entityType,
                status,
                processed,
                total,
                succeeded,
                failed,
                startedAtUtc = DateTime.UtcNow,
                finishedAtUtc = status is "Completed" or "Failed" ? DateTime.UtcNow : (DateTime?)null,
                errorSummary
            },
            cancellationToken);
    }
}
