using CRM.Enterprise.Api.Contracts.Leads;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.LeadsManage)]
[ApiController]
[Route("api/leads/assignment-rules")]
public class LeadAssignmentRulesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public LeadAssignmentRulesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LeadAssignmentRuleDto>>> GetRules(CancellationToken cancellationToken)
    {
        var rules = await _dbContext.LeadAssignmentRules
            .OrderBy(r => r.Name)
            .ToListAsync(cancellationToken);

        var userIds = rules
            .SelectMany(r => new[] { r.AssignedUserId, r.LastAssignedUserId })
            .Where(id => id.HasValue && id.Value != Guid.Empty)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        var users = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var dtos = rules.Select(r => new LeadAssignmentRuleDto(
            r.Id,
            r.Name,
            r.Type,
            r.IsActive,
            r.Territory,
            r.AssignedUserId,
            users.FirstOrDefault(u => u.Id == r.AssignedUserId)?.FullName,
            r.LastAssignedUserId,
            users.FirstOrDefault(u => u.Id == r.LastAssignedUserId)?.FullName));

        return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult<LeadAssignmentRuleDto>> Create([FromBody] UpsertLeadAssignmentRuleRequest request, CancellationToken cancellationToken)
    {
        var rule = new Domain.Entities.LeadAssignmentRule
        {
            Name = request.Name,
            Type = request.Type,
            IsActive = request.IsActive,
            Territory = request.Territory,
            AssignedUserId = request.AssignedUserId,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.LeadAssignmentRules.Add(rule);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetRules), new LeadAssignmentRuleDto(
            rule.Id,
            rule.Name,
            rule.Type,
            rule.IsActive,
            rule.Territory,
            rule.AssignedUserId,
            null,
            rule.LastAssignedUserId,
            null));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertLeadAssignmentRuleRequest request, CancellationToken cancellationToken)
    {
        var rule = await _dbContext.LeadAssignmentRules.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (rule is null) return NotFound();

        rule.Name = request.Name;
        rule.Type = request.Type;
        rule.IsActive = request.IsActive;
        rule.Territory = request.Territory;
        rule.AssignedUserId = request.AssignedUserId;
        rule.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var rule = await _dbContext.LeadAssignmentRules.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (rule is null) return NotFound();

        _dbContext.LeadAssignmentRules.Remove(rule);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
