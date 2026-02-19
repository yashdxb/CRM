namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantActionScoringPolicy(
    AssistantActionScoringWeights Weights,
    AssistantActionScoringThresholds Thresholds);

public sealed record AssistantActionScoringWeights(
    decimal SlaBreaches,
    decimal StaleOpportunities,
    decimal PendingApprovals,
    decimal LowConfidenceLeads,
    decimal OverdueActivities);

public sealed record AssistantActionScoringThresholds(
    int MediumRiskFrom,
    int HighRiskFrom,
    int SoonUrgencyFrom,
    int ImmediateUrgencyFrom);

public static class AssistantActionScoringPolicyDefaults
{
    public static AssistantActionScoringPolicy CreateDefault()
    {
        return new AssistantActionScoringPolicy(
            new AssistantActionScoringWeights(
                SlaBreaches: 14m,
                StaleOpportunities: 12m,
                PendingApprovals: 17m,
                LowConfidenceLeads: 9m,
                OverdueActivities: 11m),
            new AssistantActionScoringThresholds(
                MediumRiskFrom: 45,
                HighRiskFrom: 75,
                SoonUrgencyFrom: 50,
                ImmediateUrgencyFrom: 80));
    }

    public static AssistantActionScoringPolicy Normalize(AssistantActionScoringPolicy? policy)
    {
        var baseline = CreateDefault();
        if (policy is null)
        {
            return baseline;
        }

        var weights = policy.Weights ?? baseline.Weights;
        var thresholds = policy.Thresholds ?? baseline.Thresholds;

        var normalizedThresholds = new AssistantActionScoringThresholds(
            MediumRiskFrom: Clamp((int)thresholds.MediumRiskFrom, 1, 95),
            HighRiskFrom: Clamp((int)thresholds.HighRiskFrom, 5, 99),
            SoonUrgencyFrom: Clamp((int)thresholds.SoonUrgencyFrom, 1, 95),
            ImmediateUrgencyFrom: Clamp((int)thresholds.ImmediateUrgencyFrom, 5, 99));

        if (normalizedThresholds.HighRiskFrom <= normalizedThresholds.MediumRiskFrom)
        {
            normalizedThresholds = normalizedThresholds with { HighRiskFrom = Math.Min(99, normalizedThresholds.MediumRiskFrom + 15) };
        }

        if (normalizedThresholds.ImmediateUrgencyFrom <= normalizedThresholds.SoonUrgencyFrom)
        {
            normalizedThresholds = normalizedThresholds with { ImmediateUrgencyFrom = Math.Min(99, normalizedThresholds.SoonUrgencyFrom + 15) };
        }

        return new AssistantActionScoringPolicy(
            new AssistantActionScoringWeights(
                SlaBreaches: Math.Max(0m, weights.SlaBreaches),
                StaleOpportunities: Math.Max(0m, weights.StaleOpportunities),
                PendingApprovals: Math.Max(0m, weights.PendingApprovals),
                LowConfidenceLeads: Math.Max(0m, weights.LowConfidenceLeads),
                OverdueActivities: Math.Max(0m, weights.OverdueActivities)),
            normalizedThresholds);
    }

    private static int Clamp(int value, int min, int max)
    {
        return Math.Min(max, Math.Max(min, value));
    }
}
