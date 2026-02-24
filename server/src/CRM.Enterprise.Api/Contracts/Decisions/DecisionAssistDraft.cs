namespace CRM.Enterprise.Api.Contracts.Decisions;

public sealed record DecisionAssistDraft(
    Guid DecisionId,
    string Summary,
    string RecommendedAction,
    string ApprovalDraftNote,
    string RejectDraftNote,
    string RequestInfoDraftNote,
    IReadOnlyList<string> MissingEvidence,
    string Disclaimer);
