using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/import-jobs")]
public class ImportJobsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public ImportJobsController(
        CrmDbContext dbContext,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<ImportJobStatusResponse>> Get(Guid id, CancellationToken cancellationToken)
    {
        var job = await _dbContext.ImportJobs
            .AsNoTracking()
            .FirstOrDefaultAsync(j => j.Id == id, cancellationToken);
        if (job is null)
        {
            return NotFound();
        }

        var errors = Array.Empty<CsvImportError>();
        if (!string.IsNullOrWhiteSpace(job.ErrorsJson))
        {
            try
            {
                errors = JsonSerializer.Deserialize<CsvImportError[]>(job.ErrorsJson) ?? Array.Empty<CsvImportError>();
            }
            catch
            {
                errors = Array.Empty<CsvImportError>();
            }
        }

        await PublishProgressAsync(job, cancellationToken);

        return Ok(new ImportJobStatusResponse(
            job.Id,
            job.EntityType,
            job.Status,
            job.TotalRows,
            job.Imported,
            job.Skipped,
            errors,
            job.CreatedAtUtc,
            job.CompletedAtUtc,
            job.ErrorMessage));
    }

    private async Task PublishProgressAsync(ImportJob job, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty || job.TenantId != tenantId)
        {
            return;
        }

        var payload = new
        {
            jobId = job.Id,
            entityType = job.EntityType,
            status = job.Status,
            processed = job.Imported + job.Skipped,
            total = job.TotalRows,
            succeeded = job.Imported,
            failed = job.Skipped,
            startedAtUtc = job.CreatedAtUtc,
            finishedAtUtc = job.CompletedAtUtc,
            errorSummary = job.ErrorMessage
        };

        if (job.RequestedById is Guid requestedBy && requestedBy != Guid.Empty)
        {
            await _realtimePublisher.PublishUserEventAsync(tenantId, requestedBy, "import.job.progress", payload, cancellationToken);
            return;
        }

        await _realtimePublisher.PublishTenantEventAsync(tenantId, "import.job.progress", payload, cancellationToken);
    }
}
