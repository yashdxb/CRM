namespace CRM.Enterprise.Application.Assistant;

public sealed class AssistantRateLimitException : InvalidOperationException
{
    public AssistantRateLimitException(int retryAfterSeconds)
        : base($"Assistant is busy. Please retry in {retryAfterSeconds} seconds.")
    {
        RetryAfterSeconds = retryAfterSeconds;
    }

    public int RetryAfterSeconds { get; }
}
