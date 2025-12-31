using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Api.Contracts.Shared;
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

    public ImportJobsController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
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
}
