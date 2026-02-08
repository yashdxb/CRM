using CRM.Enterprise.Api.Contracts.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/opportunities/automation-rules")]
public class OpportunityAutomationRulesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public OpportunityAutomationRulesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OpportunityStageAutomationRuleResponse>>> GetRules(
        CancellationToken cancellationToken)
    {
        var rules = await _dbContext.OpportunityStageAutomationRules
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .OrderByDescending(r => r.UpdatedAtUtc ?? r.CreatedAtUtc)
            .Select(r => new OpportunityStageAutomationRuleResponse(
                r.Id,
                r.Name,
                r.StageName,
                r.TaskSubject,
                r.TaskDescription,
                r.DueInDays,
                r.Priority,
                r.IsActive,
                r.UpdatedAtUtc))
            .ToListAsync(cancellationToken);

        return Ok(rules);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<OpportunityStageAutomationRuleResponse>> CreateRule(
        [FromBody] OpportunityStageAutomationRuleRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Rule name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.StageName))
        {
            return BadRequest("Stage name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.TaskSubject))
        {
            return BadRequest("Task subject is required.");
        }

        var exists = await _dbContext.OpportunityStageAutomationRules.AnyAsync(rule =>
            !rule.IsDeleted
            && rule.Name == request.Name.Trim()
            && rule.StageName == request.StageName.Trim(), cancellationToken);

        if (exists)
        {
            return Conflict("A matching automation rule already exists.");
        }

        var rule = new OpportunityStageAutomationRule
        {
            Name = request.Name.Trim(),
            StageName = request.StageName.Trim(),
            TaskSubject = request.TaskSubject.Trim(),
            TaskDescription = string.IsNullOrWhiteSpace(request.TaskDescription) ? null : request.TaskDescription.Trim(),
            DueInDays = Math.Max(0, request.DueInDays),
            Priority = string.IsNullOrWhiteSpace(request.Priority) ? null : request.Priority.Trim(),
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.OpportunityStageAutomationRules.Add(rule);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new OpportunityStageAutomationRuleResponse(
            rule.Id,
            rule.Name,
            rule.StageName,
            rule.TaskSubject,
            rule.TaskDescription,
            rule.DueInDays,
            rule.Priority,
            rule.IsActive,
            rule.UpdatedAtUtc));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult> UpdateRule(
        Guid id,
        [FromBody] OpportunityStageAutomationRuleRequest request,
        CancellationToken cancellationToken)
    {
        var rule = await _dbContext.OpportunityStageAutomationRules
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);
        if (rule is null)
        {
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Rule name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.StageName))
        {
            return BadRequest("Stage name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.TaskSubject))
        {
            return BadRequest("Task subject is required.");
        }

        var duplicate = await _dbContext.OpportunityStageAutomationRules.AnyAsync(existing =>
            !existing.IsDeleted
            && existing.Id != id
            && existing.Name == request.Name.Trim()
            && existing.StageName == request.StageName.Trim(), cancellationToken);

        if (duplicate)
        {
            return Conflict("A matching automation rule already exists.");
        }

        rule.Name = request.Name.Trim();
        rule.StageName = request.StageName.Trim();
        rule.TaskSubject = request.TaskSubject.Trim();
        rule.TaskDescription = string.IsNullOrWhiteSpace(request.TaskDescription) ? null : request.TaskDescription.Trim();
        rule.DueInDays = Math.Max(0, request.DueInDays);
        rule.Priority = string.IsNullOrWhiteSpace(request.Priority) ? null : request.Priority.Trim();
        rule.IsActive = request.IsActive;
        rule.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult> DeleteRule(Guid id, CancellationToken cancellationToken)
    {
        var rule = await _dbContext.OpportunityStageAutomationRules
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);
        if (rule is null)
        {
            return NotFound();
        }

        rule.IsDeleted = true;
        rule.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
