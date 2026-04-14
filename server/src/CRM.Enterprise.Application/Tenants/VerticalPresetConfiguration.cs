using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Qualifications;

namespace CRM.Enterprise.Application.Tenants;

public static class VerticalPresetIds
{
    public const string CoreCrm = "CoreCRM";
    public const string RealEstateBrokerage = "RealEstateBrokerage";

    public static string Normalize(string? presetId)
    {
        var value = string.IsNullOrWhiteSpace(presetId) ? CoreCrm : presetId.Trim();
        return value switch
        {
            RealEstateBrokerage => RealEstateBrokerage,
            _ => CoreCrm
        };
    }
}

public sealed record VerticalPresetConfiguration(
    string PresetId,
    VerticalVocabulary Vocabulary,
    BrokerageLeadProfileCatalog BrokerageLeadProfileCatalog,
    IReadOnlyList<string> DashboardPackDefaults,
    IReadOnlyList<string> ReportLibraryHighlights,
    IReadOnlyList<string> WorkflowTemplateHighlights);

public sealed record VerticalVocabulary(
    string LeadQualificationLabel,
    string OpportunitySingularLabel,
    string OpportunityPluralLabel,
    string PipelineLabel,
    string QualificationGuidance);

public sealed record BrokerageLeadProfileCatalog(
    IReadOnlyList<string> BuyerTypes,
    IReadOnlyList<string> MotivationUrgencies,
    IReadOnlyList<string> FinancingReadinessOptions,
    IReadOnlyList<string> PreApprovalStatuses,
    IReadOnlyList<string> PreferredAreas,
    IReadOnlyList<string> PropertyTypes,
    IReadOnlyList<string> BudgetBands);

public sealed record OpportunityStagePresetDefinition(
    string Name,
    int Order,
    bool IsClosedStage,
    string ForecastCategory);

public static class VerticalPresetDefaults
{
    public static VerticalPresetConfiguration Normalize(VerticalPresetConfiguration? config)
    {
        if (config is null)
        {
            return Create(null);
        }

        var fallback = Create(config.PresetId);
        var vocabulary = config.Vocabulary ?? fallback.Vocabulary;
        var brokerageCatalog = config.BrokerageLeadProfileCatalog ?? fallback.BrokerageLeadProfileCatalog;
        return config with
        {
            Vocabulary = vocabulary with
            {
                LeadQualificationLabel = string.IsNullOrWhiteSpace(vocabulary.LeadQualificationLabel)
                    ? fallback.Vocabulary.LeadQualificationLabel
                    : vocabulary.LeadQualificationLabel,
                OpportunitySingularLabel = string.IsNullOrWhiteSpace(vocabulary.OpportunitySingularLabel)
                    ? fallback.Vocabulary.OpportunitySingularLabel
                    : vocabulary.OpportunitySingularLabel,
                OpportunityPluralLabel = string.IsNullOrWhiteSpace(vocabulary.OpportunityPluralLabel)
                    ? fallback.Vocabulary.OpportunityPluralLabel
                    : vocabulary.OpportunityPluralLabel,
                PipelineLabel = string.IsNullOrWhiteSpace(vocabulary.PipelineLabel)
                    ? fallback.Vocabulary.PipelineLabel
                    : vocabulary.PipelineLabel,
                QualificationGuidance = string.IsNullOrWhiteSpace(vocabulary.QualificationGuidance)
                    ? fallback.Vocabulary.QualificationGuidance
                    : vocabulary.QualificationGuidance
            },
            BrokerageLeadProfileCatalog = new BrokerageLeadProfileCatalog(
                brokerageCatalog.BuyerTypes is null || brokerageCatalog.BuyerTypes.Count == 0 ? fallback.BrokerageLeadProfileCatalog.BuyerTypes : brokerageCatalog.BuyerTypes,
                brokerageCatalog.MotivationUrgencies is null || brokerageCatalog.MotivationUrgencies.Count == 0 ? fallback.BrokerageLeadProfileCatalog.MotivationUrgencies : brokerageCatalog.MotivationUrgencies,
                brokerageCatalog.FinancingReadinessOptions is null || brokerageCatalog.FinancingReadinessOptions.Count == 0 ? fallback.BrokerageLeadProfileCatalog.FinancingReadinessOptions : brokerageCatalog.FinancingReadinessOptions,
                brokerageCatalog.PreApprovalStatuses is null || brokerageCatalog.PreApprovalStatuses.Count == 0 ? fallback.BrokerageLeadProfileCatalog.PreApprovalStatuses : brokerageCatalog.PreApprovalStatuses,
                brokerageCatalog.PreferredAreas is null || brokerageCatalog.PreferredAreas.Count == 0 ? fallback.BrokerageLeadProfileCatalog.PreferredAreas : brokerageCatalog.PreferredAreas,
                brokerageCatalog.PropertyTypes is null || brokerageCatalog.PropertyTypes.Count == 0 ? fallback.BrokerageLeadProfileCatalog.PropertyTypes : brokerageCatalog.PropertyTypes,
                brokerageCatalog.BudgetBands is null || brokerageCatalog.BudgetBands.Count == 0 ? fallback.BrokerageLeadProfileCatalog.BudgetBands : brokerageCatalog.BudgetBands),
            DashboardPackDefaults = config.DashboardPackDefaults is null || config.DashboardPackDefaults.Count == 0 ? fallback.DashboardPackDefaults : config.DashboardPackDefaults,
            ReportLibraryHighlights = config.ReportLibraryHighlights is null || config.ReportLibraryHighlights.Count == 0 ? fallback.ReportLibraryHighlights : config.ReportLibraryHighlights,
            WorkflowTemplateHighlights = config.WorkflowTemplateHighlights is null || config.WorkflowTemplateHighlights.Count == 0 ? fallback.WorkflowTemplateHighlights : config.WorkflowTemplateHighlights
        };
    }

    public static VerticalPresetConfiguration Create(string? presetId)
    {
        return VerticalPresetIds.Normalize(presetId) switch
        {
            VerticalPresetIds.RealEstateBrokerage => new VerticalPresetConfiguration(
                VerticalPresetIds.RealEstateBrokerage,
                new VerticalVocabulary(
                    "Buyer readiness",
                    "Transaction",
                    "Transactions",
                    "Transaction pipeline",
                    "Validate financing readiness, preferred area, property fit, urgency, and decision-maker access before progressing this lead."),
                new BrokerageLeadProfileCatalog(
                    [
                        "First-time buyer",
                        "Move-up buyer",
                        "Investor",
                        "Seller",
                        "Landlord",
                        "Tenant"
                    ],
                    [
                        "Immediate / this month",
                        "30-60 days",
                        "60-90 days",
                        "Exploring / future",
                        "Research only"
                    ],
                    [
                        "Cash ready",
                        "Pre-approved",
                        "Broker engaged",
                        "Needs financing guidance",
                        "Unknown"
                    ],
                    [
                        "Verified pre-approval letter",
                        "Verbal lender confirmation",
                        "Broker conversation only",
                        "No pre-approval yet",
                        "Cash buyer"
                    ],
                    [
                        "Downtown",
                        "North York",
                        "Mississauga",
                        "Etobicoke",
                        "Scarborough",
                        "York Region"
                    ],
                    [
                        "Condo",
                        "Townhouse",
                        "Detached",
                        "Semi-detached",
                        "Commercial",
                        "Land"
                    ],
                    [
                        "Under $500k",
                        "$500k - $750k",
                        "$750k - $1M",
                        "$1M - $1.5M",
                        "$1.5M+"
                    ]),
                [
                    "Agent Daily Pipeline",
                    "Broker Coaching Board"
                ],
                [
                    "Leads by Source and Readiness",
                    "Active Buyers by Stage",
                    "Offer Pipeline Summary",
                    "Stale Leads with Weak Conversation Signal"
                ],
                [
                    "New Inquiry Follow-up SLA",
                    "Showing Follow-up Automation",
                    "Weak Conversation Coaching",
                    "Low-Readiness Conversion Approval"
                ]),
            _ => new VerticalPresetConfiguration(
                VerticalPresetIds.CoreCrm,
                new VerticalVocabulary(
                    "Qualification",
                    "Deal",
                    "Deals",
                    "Deal pipeline",
                    "Validate fit, timeline, economic buyer, and urgency before progressing this lead."),
                new BrokerageLeadProfileCatalog([], [], [], [], [], [], []),
                [
                    "Revenue Intelligence"
                ],
                [
                    "Pipeline by Stage",
                    "Open Opportunities by Owner",
                    "Lead Conversion Summary"
                ],
                [
                    "Deal Approval",
                    "Discount Approval",
                    "Large Deal Escalation",
                    "Stage Gate Exception"
                ])
        };
    }

    public static LeadDispositionPolicy CreateLeadDispositionPolicy(string? presetId)
    {
        return VerticalPresetIds.Normalize(presetId) switch
        {
            VerticalPresetIds.RealEstateBrokerage => new LeadDispositionPolicy(
                [
                    "No financing readiness",
                    "No active move timeline",
                    "Outside service area",
                    "Property fit mismatch",
                    "Duplicate / already represented",
                    "No response after repeated follow-up",
                    "Investor criteria not viable",
                    "Seller not ready to list",
                    "Invalid contact information",
                    "Other"
                ],
                [
                    "Lost to another brokerage",
                    "Client paused search",
                    "Financing fell through",
                    "Property not found in time",
                    "Seller withdrew listing intent",
                    "Timeline moved out",
                    "Offer not accepted",
                    "Relationship lost",
                    "Other"
                ]),
            _ => new LeadDispositionPolicy([], [])
        };
    }

    public static QualificationPolicy CreateQualificationPolicy(string? presetId)
    {
        var policy = QualificationPolicyDefaults.CreateDefault();
        if (VerticalPresetIds.Normalize(presetId) != VerticalPresetIds.RealEstateBrokerage)
        {
            return policy;
        }

        return policy with
        {
            EvidenceSources =
            [
                "Email thread",
                "Call notes",
                "Meeting recap",
                "Pre-approval letter",
                "Financing discussion",
                "Property brief",
                "Showing feedback"
            ]
        };
    }

    public static IReadOnlyList<OpportunityStagePresetDefinition> CreateOpportunityStages(string? presetId)
    {
        return VerticalPresetIds.Normalize(presetId) switch
        {
            VerticalPresetIds.RealEstateBrokerage =>
            [
                new OpportunityStagePresetDefinition("New Inquiry", 1, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Qualified", 2, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Showing Scheduled", 3, false, "Best Case"),
                new OpportunityStagePresetDefinition("Active Search", 4, false, "Best Case"),
                new OpportunityStagePresetDefinition("Offer Submitted", 5, false, "Commit"),
                new OpportunityStagePresetDefinition("Under Contract", 6, false, "Commit"),
                new OpportunityStagePresetDefinition("Closed Won", 7, true, "Closed"),
                new OpportunityStagePresetDefinition("Closed Lost", 8, true, "Omitted")
            ],
            _ =>
            [
                new OpportunityStagePresetDefinition("Prospecting", 1, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Qualification", 2, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Proposal", 3, false, "Best Case"),
                new OpportunityStagePresetDefinition("Negotiation", 4, false, "Commit"),
                new OpportunityStagePresetDefinition("Closed Won", 5, true, "Closed"),
                new OpportunityStagePresetDefinition("Closed Lost", 6, true, "Omitted")
            ]
        };
    }
}
