using CRM.Enterprise.Api.Contracts.Roles;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Security;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/security-levels")]
[Authorize(Policy = Permissions.Policies.AdministrationView)]
public class SecurityLevelsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public SecurityLevelsController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SecurityLevelResponse>>> GetSecurityLevels(CancellationToken cancellationToken)
    {
        var levels = await _dbContext.SecurityLevelDefinitions
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.Rank)
            .ToListAsync(cancellationToken);

        var responses = levels.Select(ToResponse).ToList();
        return Ok(responses);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<SecurityLevelResponse>> CreateSecurityLevel(
        [FromBody] UpsertSecurityLevelRequest request,
        CancellationToken cancellationToken)
    {
        var error = ValidateRequest(request);
        if (error is not null)
        {
            return BadRequest(error);
        }

        var exists = await _dbContext.SecurityLevelDefinitions
            .AnyAsync(s => !s.IsDeleted && s.Name.ToLower() == request.Name.Trim().ToLower(), cancellationToken);
        if (exists)
        {
            return Conflict("A security level with that name already exists.");
        }

        var level = new SecurityLevelDefinition
        {
            Name = request.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            Rank = request.Rank,
            IsDefault = request.IsDefault ?? false
        };

        if (level.IsDefault)
        {
            await ClearDefaultsAsync(cancellationToken);
        }

        _dbContext.SecurityLevelDefinitions.Add(level);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(GetSecurityLevels), new { id = level.Id }, ToResponse(level));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<SecurityLevelResponse>> UpdateSecurityLevel(
        Guid id,
        [FromBody] UpsertSecurityLevelRequest request,
        CancellationToken cancellationToken)
    {
        var error = ValidateRequest(request);
        if (error is not null)
        {
            return BadRequest(error);
        }

        var level = await _dbContext.SecurityLevelDefinitions
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);
        if (level is null)
        {
            return NotFound();
        }

        var name = request.Name.Trim();
        var duplicate = await _dbContext.SecurityLevelDefinitions
            .AnyAsync(s => s.Id != id && !s.IsDeleted && s.Name.ToLower() == name.ToLower(), cancellationToken);
        if (duplicate)
        {
            return Conflict("Another security level already uses that name.");
        }

        level.Name = name;
        level.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        level.Rank = request.Rank;

        var wantsDefault = request.IsDefault ?? level.IsDefault;
        if (wantsDefault && !level.IsDefault)
        {
            await ClearDefaultsAsync(cancellationToken);
            level.IsDefault = true;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(ToResponse(level));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> DeleteSecurityLevel(Guid id, CancellationToken cancellationToken)
    {
        var level = await _dbContext.SecurityLevelDefinitions
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);
        if (level is null)
        {
            return NotFound();
        }

        var inUse = await _dbContext.Roles
            .AnyAsync(r => !r.IsDeleted && r.SecurityLevelId == id, cancellationToken);
        if (inUse)
        {
            return BadRequest("Security level is assigned to roles and cannot be deleted.");
        }

        level.IsDeleted = true;
        level.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private static string? ValidateRequest(UpsertSecurityLevelRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return "Security level name is required.";
        }

        if (request.Rank < 0)
        {
            return "Security level rank must be zero or greater.";
        }

        return null;
    }

    private static SecurityLevelResponse ToResponse(SecurityLevelDefinition level)
        => new(level.Id, level.Name, level.Description, level.Rank, level.IsDefault);

    private async Task ClearDefaultsAsync(CancellationToken cancellationToken)
    {
        var defaults = await _dbContext.SecurityLevelDefinitions
            .Where(s => !s.IsDeleted && s.IsDefault)
            .ToListAsync(cancellationToken);

        if (defaults.Count == 0)
        {
            return;
        }

        foreach (var level in defaults)
        {
            level.IsDefault = false;
            level.UpdatedAtUtc = DateTime.UtcNow;
        }
    }
}
