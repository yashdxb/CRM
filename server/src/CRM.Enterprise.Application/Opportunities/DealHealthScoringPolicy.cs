namespace CRM.Enterprise.Application.Opportunities;

/// <summary>
/// Configurable policy for the deal health score formula.
/// Each dimension has an enabled flag, max score, and thresholds that control scoring brackets.
/// </summary>
public sealed record DealHealthScoringPolicy(
    IReadOnlyList<DealHealthDimensionConfig> Dimensions,
    DealHealthBandThresholds Bands,
    decimal Confidence);

/// <summary>
/// Configuration for a single health scoring dimension.
/// </summary>
public sealed record DealHealthDimensionConfig(
    string Key,
    string Label,
    int MaxScore,
    bool Enabled,
    IReadOnlyList<DealHealthBracket>? Brackets);

/// <summary>
/// A scoring bracket mapping a threshold to a score value.
/// The evaluator walks brackets in order and uses the first match (value &lt;= Threshold).
/// </summary>
public sealed record DealHealthBracket(
    double Threshold,
    int Score);

/// <summary>
/// Configurable band thresholds for overall score labels.
/// Scores >= Excellent → "Excellent", >= Good → "Good", etc.
/// </summary>
public sealed record DealHealthBandThresholds(
    int Excellent,
    int Good,
    int Fair,
    int AtRisk);

public static class DealHealthScoringPolicyDefaults
{
    public static DealHealthScoringPolicy CreateDefault()
    {
        return new DealHealthScoringPolicy(
            Dimensions: new List<DealHealthDimensionConfig>
            {
                new("StageProgression", "Stage Progression", 15, true,
                    new List<DealHealthBracket>
                    {
                        new(1, 3), new(2, 6), new(3, 9), new(4, 12), new(5, 15)
                    }),
                new("ActivityRecency", "Activity Recency", 20, true,
                    new List<DealHealthBracket>
                    {
                        new(3, 20), new(7, 16), new(14, 12), new(30, 6), new(9999, 0)
                    }),
                new("CloseDateHealth", "Close Date Health", 15, true,
                    new List<DealHealthBracket>
                    {
                        new(0, 0), new(7, 8), new(30, 12), new(90, 15), new(9999, 10)
                    }),
                new("StakeholderCoverage", "Stakeholder Coverage", 10, true,
                    new List<DealHealthBracket>
                    {
                        new(0, 0), new(1, 4), new(2, 7), new(3, 10)
                    }),
                new("DealCompleteness", "Deal Completeness", 15, true, null),
                new("TeamCoverage", "Team Coverage", 10, true,
                    new List<DealHealthBracket>
                    {
                        new(0, 2), new(1, 6), new(2, 10)
                    }),
                new("ProcessCompliance", "Process Compliance", 15, true, null)
            },
            Bands: new DealHealthBandThresholds(
                Excellent: 80,
                Good: 60,
                Fair: 40,
                AtRisk: 20),
            Confidence: 0.75m);
    }

    public static DealHealthScoringPolicy Normalize(DealHealthScoringPolicy? policy)
    {
        var baseline = CreateDefault();
        if (policy is null)
        {
            return baseline;
        }

        var dimensions = (policy.Dimensions ?? Array.Empty<DealHealthDimensionConfig>()).ToList();
        if (dimensions.Count == 0)
        {
            dimensions = baseline.Dimensions.ToList();
        }

        // Ensure every default dimension key exists (merge new defaults that the tenant hasn't seen).
        var existingKeys = new HashSet<string>(dimensions.Select(d => d.Key), StringComparer.OrdinalIgnoreCase);
        foreach (var baselineDim in baseline.Dimensions)
        {
            if (!existingKeys.Contains(baselineDim.Key))
            {
                dimensions.Add(baselineDim);
            }
        }

        // Clamp values to sensible ranges.
        dimensions = dimensions.Select(d => d with
        {
            MaxScore = Math.Max(0, Math.Min(d.MaxScore, 100)),
            Label = string.IsNullOrWhiteSpace(d.Label) ? d.Key : d.Label.Trim()
        }).ToList();

        var bands = policy.Bands ?? baseline.Bands;
        bands = new DealHealthBandThresholds(
            Excellent: Clamp(bands.Excellent, 1, 100),
            Good: Clamp(bands.Good, 1, bands.Excellent - 1),
            Fair: Clamp(bands.Fair, 1, bands.Good - 1),
            AtRisk: Clamp(bands.AtRisk, 1, bands.Fair - 1));

        var confidence = policy.Confidence <= 0 || policy.Confidence > 1
            ? baseline.Confidence
            : policy.Confidence;

        return new DealHealthScoringPolicy(dimensions, bands, confidence);
    }

    private static int Clamp(int value, int min, int max) => Math.Min(max, Math.Max(min, value));
}
