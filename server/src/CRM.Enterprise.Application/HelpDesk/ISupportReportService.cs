namespace CRM.Enterprise.Application.HelpDesk;

public interface ISupportReportService
{
    Task<HelpDeskReportSummaryDto> GetSummaryAsync(CancellationToken cancellationToken = default);
}
