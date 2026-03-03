namespace CRM.Enterprise.Application.HelpDesk;

public interface ISupportEmailIntakeService
{
    Task<HelpDeskOperationResult> ProcessInboundAsync(HelpDeskEmailIntakeRequest request, CancellationToken cancellationToken = default);
}
