namespace CRM.Enterprise.Application.HelpDesk;

public interface ISupportCaseService
{
    Task<SupportCaseSearchResultDto> SearchCasesAsync(SupportCaseSearchRequest request, CancellationToken cancellationToken = default);
    Task<SupportCaseDetailDto?> GetCaseAsync(Guid id, CancellationToken cancellationToken = default);
    Task<HelpDeskValueResult<SupportCaseListItemDto>> CreateCaseAsync(SupportCaseCreateRequest request, CancellationToken cancellationToken = default);
    Task<HelpDeskOperationResult> UpdateCaseAsync(Guid id, SupportCaseUpdateRequest request, CancellationToken cancellationToken = default);
    Task<HelpDeskOperationResult> AssignCaseAsync(Guid id, SupportCaseAssignRequest request, CancellationToken cancellationToken = default);
    Task<HelpDeskOperationResult> ChangeStatusAsync(Guid id, SupportCaseStatusRequest request, CancellationToken cancellationToken = default);
    Task<HelpDeskValueResult<SupportCaseCommentDto>> AddCommentAsync(Guid id, SupportCaseCommentCreateRequest request, CancellationToken cancellationToken = default);
}
