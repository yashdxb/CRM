using System.Text.Json.Serialization;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Qualifications;

namespace CRM.Enterprise.Application.Tenants;

public static class VerticalPresetIds
{
    public const string CoreCrm = "CoreCRM";
    public const string RealEstateBrokerage = "RealEstateBrokerage";
    public const string TruckingCarrierBroker = "TruckingCarrierBroker";

    public static string Normalize(string? presetId)
    {
        var value = string.IsNullOrWhiteSpace(presetId) ? CoreCrm : presetId.Trim();
        return value switch
        {
            RealEstateBrokerage => RealEstateBrokerage,
            TruckingCarrierBroker => TruckingCarrierBroker,
            _ => CoreCrm
        };
    }
}

public static class VerticalLeadProfileFieldKeys
{
    public const string BrokerageBuyerTypes = "brokerage.buyerTypes";
    public const string BrokerageMotivationUrgencies = "brokerage.motivationUrgencies";
    public const string BrokerageFinancingReadinessOptions = "brokerage.financingReadinessOptions";
    public const string BrokeragePreApprovalStatuses = "brokerage.preApprovalStatuses";
    public const string BrokeragePreferredAreas = "brokerage.preferredAreas";
    public const string BrokeragePropertyTypes = "brokerage.propertyTypes";
    public const string BrokerageBudgetBands = "brokerage.budgetBands";

    public const string TruckingShipperTypes = "trucking.shipperTypes";
    public const string TruckingFreightModes = "trucking.freightModes";
    public const string TruckingEquipmentTypes = "trucking.equipmentTypes";
    public const string TruckingCommodities = "trucking.commodities";
    public const string TruckingOriginRegions = "trucking.originRegions";
    public const string TruckingDestinationRegions = "trucking.destinationRegions";
    public const string TruckingShipmentFrequencyBands = "trucking.shipmentFrequencyBands";
    public const string TruckingAnnualFreightSpendBands = "trucking.annualFreightSpendBands";
    public const string TruckingServiceSensitivityLevels = "trucking.serviceSensitivityLevels";
    public const string TruckingPricingSensitivityLevels = "trucking.pricingSensitivityLevels";
}

public sealed record VerticalPresetConfiguration
{
    public string PresetId { get; init; } = VerticalPresetIds.CoreCrm;
    public VerticalVocabulary Vocabulary { get; init; } = new();
    public VerticalLeadProfileCatalog LeadProfileCatalog { get; init; } = new();

    // Backward-compatibility shim for existing tenant JSON persisted before the generic catalog refactor.
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public BrokerageLeadProfileCatalog? BrokerageLeadProfileCatalog { get; init; }

    public IReadOnlyList<string> DashboardPackDefaults { get; init; } = [];
    public IReadOnlyList<string> ReportLibraryHighlights { get; init; } = [];
    public IReadOnlyList<string> WorkflowTemplateHighlights { get; init; } = [];
}

public sealed record VerticalVocabulary
{
    public string LeadQualificationLabel { get; init; } = string.Empty;
    public string OpportunitySingularLabel { get; init; } = string.Empty;
    public string OpportunityPluralLabel { get; init; } = string.Empty;
    public string PipelineLabel { get; init; } = string.Empty;
    public string QualificationGuidance { get; init; } = string.Empty;
}

public sealed record VerticalLeadProfileCatalog
{
    public IReadOnlyDictionary<string, IReadOnlyList<string>> Fields { get; init; } = new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase);
}

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
        var mergedCatalog = MergeCatalog(config.LeadProfileCatalog, config.BrokerageLeadProfileCatalog, fallback.LeadProfileCatalog);

        return config with
        {
            PresetId = VerticalPresetIds.Normalize(config.PresetId),
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
            LeadProfileCatalog = mergedCatalog,
            BrokerageLeadProfileCatalog = null,
            DashboardPackDefaults = config.DashboardPackDefaults is null || config.DashboardPackDefaults.Count == 0 ? fallback.DashboardPackDefaults : config.DashboardPackDefaults,
            ReportLibraryHighlights = config.ReportLibraryHighlights is null || config.ReportLibraryHighlights.Count == 0 ? fallback.ReportLibraryHighlights : config.ReportLibraryHighlights,
            WorkflowTemplateHighlights = config.WorkflowTemplateHighlights is null || config.WorkflowTemplateHighlights.Count == 0 ? fallback.WorkflowTemplateHighlights : config.WorkflowTemplateHighlights
        };
    }

    public static VerticalPresetConfiguration Create(string? presetId)
    {
        return VerticalPresetIds.Normalize(presetId) switch
        {
            VerticalPresetIds.RealEstateBrokerage => new VerticalPresetConfiguration
            {
                PresetId = VerticalPresetIds.RealEstateBrokerage,
                Vocabulary = new VerticalVocabulary
                {
                    LeadQualificationLabel = "Buyer readiness",
                    OpportunitySingularLabel = "Transaction",
                    OpportunityPluralLabel = "Transactions",
                    PipelineLabel = "Transaction pipeline",
                    QualificationGuidance = "Validate financing readiness, preferred area, property fit, urgency, and decision-maker access before progressing this lead."
                },
                LeadProfileCatalog = CreateCatalog(new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase)
                {
                    [VerticalLeadProfileFieldKeys.BrokerageBuyerTypes] =
                    [
                        "First-time buyer",
                        "Move-up buyer",
                        "Investor",
                        "Seller",
                        "Landlord",
                        "Tenant"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokerageMotivationUrgencies] =
                    [
                        "Immediate / this month",
                        "30-60 days",
                        "60-90 days",
                        "Exploring / future",
                        "Research only"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokerageFinancingReadinessOptions] =
                    [
                        "Cash ready",
                        "Pre-approved",
                        "Broker engaged",
                        "Needs financing guidance",
                        "Unknown"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokeragePreApprovalStatuses] =
                    [
                        "Verified pre-approval letter",
                        "Verbal lender confirmation",
                        "Broker conversation only",
                        "No pre-approval yet",
                        "Cash buyer"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokeragePreferredAreas] =
                    [
                        "Downtown",
                        "North York",
                        "Mississauga",
                        "Etobicoke",
                        "Scarborough",
                        "York Region"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokeragePropertyTypes] =
                    [
                        "Condo",
                        "Townhouse",
                        "Detached",
                        "Semi-detached",
                        "Commercial",
                        "Land"
                    ],
                    [VerticalLeadProfileFieldKeys.BrokerageBudgetBands] =
                    [
                        "Under $500k",
                        "$500k - $750k",
                        "$750k - $1M",
                        "$1M - $1.5M",
                        "$1.5M+"
                    ]
                }),
                DashboardPackDefaults =
                [
                    "Agent Daily Pipeline",
                    "Broker Coaching Board"
                ],
                ReportLibraryHighlights =
                [
                    "Leads by Source and Readiness",
                    "Active Buyers by Stage",
                    "Offer Pipeline Summary",
                    "Stale Leads with Weak Conversation Signal"
                ],
                WorkflowTemplateHighlights =
                [
                    "New Inquiry Follow-up SLA",
                    "Showing Follow-up Automation",
                    "Weak Conversation Coaching",
                    "Low-Readiness Conversion Approval"
                ]
            },
            VerticalPresetIds.TruckingCarrierBroker => new VerticalPresetConfiguration
            {
                PresetId = VerticalPresetIds.TruckingCarrierBroker,
                Vocabulary = new VerticalVocabulary
                {
                    LeadQualificationLabel = "Shipper qualification",
                    OpportunitySingularLabel = "Freight opportunity",
                    OpportunityPluralLabel = "Freight opportunities",
                    PipelineLabel = "Freight pipeline",
                    QualificationGuidance = "Validate lane fit, equipment requirements, shipment frequency, pricing pressure, and service expectations before progressing this shipper opportunity."
                },
                LeadProfileCatalog = CreateCatalog(new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase)
                {
                    [VerticalLeadProfileFieldKeys.TruckingShipperTypes] =
                    [
                        "Retail shipper",
                        "Manufacturer",
                        "Food and beverage",
                        "E-commerce distributor",
                        "Third-party logistics provider",
                        "Freight broker"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingFreightModes] =
                    [
                        "FTL",
                        "LTL",
                        "Drayage",
                        "Reefer",
                        "Flatbed",
                        "Intermodal"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingEquipmentTypes] =
                    [
                        "Dry van",
                        "Reefer",
                        "Flatbed",
                        "Step deck",
                        "Power only",
                        "Container chassis"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingCommodities] =
                    [
                        "General merchandise",
                        "Food and beverage",
                        "Consumer packaged goods",
                        "Automotive",
                        "Building materials",
                        "Hazmat"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingOriginRegions] =
                    [
                        "Ontario",
                        "Quebec",
                        "Midwest",
                        "Southeast",
                        "Texas",
                        "Northeast"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingDestinationRegions] =
                    [
                        "Ontario",
                        "Quebec",
                        "Midwest",
                        "Southeast",
                        "Texas",
                        "Northeast"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingShipmentFrequencyBands] =
                    [
                        "Ad hoc / spot only",
                        "Weekly",
                        "Several loads per week",
                        "Daily",
                        "Dedicated volume"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingAnnualFreightSpendBands] =
                    [
                        "Under $250k",
                        "$250k - $1M",
                        "$1M - $5M",
                        "$5M - $15M",
                        "$15M+"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingServiceSensitivityLevels] =
                    [
                        "Flexible",
                        "Appointment-sensitive",
                        "Time-critical",
                        "High compliance",
                        "White-glove"
                    ],
                    [VerticalLeadProfileFieldKeys.TruckingPricingSensitivityLevels] =
                    [
                        "Rate-first",
                        "Balanced rate and service",
                        "Service-first",
                        "Dedicated capacity priority"
                    ]
                }),
                DashboardPackDefaults =
                [
                    "Freight Revenue Intelligence",
                    "Lane Coverage Board"
                ],
                ReportLibraryHighlights =
                [
                    "Quote Win Rate by Lane",
                    "At-Risk Shipper Accounts",
                    "Margin Leakage by Account",
                    "Service Exceptions by Customer"
                ],
                WorkflowTemplateHighlights =
                [
                    "New Shipper Onboarding",
                    "Spot Quote Approval",
                    "Low-Margin Quote Escalation",
                    "Missed Pickup Recovery"
                ]
            },
            _ => new VerticalPresetConfiguration
            {
                PresetId = VerticalPresetIds.CoreCrm,
                Vocabulary = new VerticalVocabulary
                {
                    LeadQualificationLabel = "Qualification",
                    OpportunitySingularLabel = "Opportunity",
                    OpportunityPluralLabel = "Opportunities",
                    PipelineLabel = "Opportunity pipeline",
                    QualificationGuidance = "Validate fit, timeline, economic buyer, and urgency before progressing this lead."
                },
                LeadProfileCatalog = CreateCatalog(),
                DashboardPackDefaults =
                [
                    "Revenue Intelligence"
                ],
                ReportLibraryHighlights =
                [
                    "Pipeline by Stage",
                    "Open Opportunities by Owner",
                    "Lead Conversion Summary"
                ],
                WorkflowTemplateHighlights =
                [
                    "Opportunity Approval",
                    "Discount Approval",
                    "Large Opportunity Escalation",
                    "Stage Gate Exception"
                ]
            }
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
            VerticalPresetIds.TruckingCarrierBroker => new LeadDispositionPolicy(
                [
                    "Outside network coverage",
                    "Equipment mismatch",
                    "Volume too low to support onboarding",
                    "Credit risk too high",
                    "Unacceptable service requirements",
                    "No active freight demand",
                    "Incumbent contract locked in",
                    "Margin below floor",
                    "No response after repeated follow-up",
                    "Other"
                ],
                [
                    "Lost to incumbent carrier or broker",
                    "Rate not competitive",
                    "Capacity unavailable at award",
                    "Service scorecard concerns",
                    "Customer moved to annual bid cycle",
                    "Lane imbalance made account unprofitable",
                    "Cargo / compliance requirements not supported",
                    "Procurement paused",
                    "Relationship lost",
                    "Other"
                ]),
            _ => new LeadDispositionPolicy([], [])
        };
    }

    public static QualificationPolicy CreateQualificationPolicy(string? presetId)
    {
        var policy = QualificationPolicyDefaults.CreateDefault();
        return VerticalPresetIds.Normalize(presetId) switch
        {
            VerticalPresetIds.RealEstateBrokerage => policy with
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
            },
            VerticalPresetIds.TruckingCarrierBroker => policy with
            {
                Factors = policy.Factors
                    .Select(ApplyTruckingSystemFactorLabels)
                    .Concat(BuildTruckingQualificationFactors())
                    .ToArray(),
                FactorEvidenceRules = policy.FactorEvidenceRules
                    .Select(ApplyTruckingSystemEvidenceRules)
                    .Concat(BuildTruckingEvidenceRules())
                    .ToArray(),
                EvidenceSources =
                [
                    "Email thread",
                    "Call notes",
                    "Rate confirmation",
                    "Lane history",
                    "Load tender",
                    "EDI or portal request",
                    "Service scorecard",
                    "Claims or exception log"
                ]
            },
            _ => policy
        };
    }

    private static QualificationFactorDefinition ApplyTruckingSystemFactorLabels(QualificationFactorDefinition factor)
    {
        return factor.Key switch
        {
            "budget" => factor with { DisplayLabel = "Freight spend availability" },
            "readiness" => factor with { DisplayLabel = "Shipping readiness" },
            "timeline" => factor with { DisplayLabel = "Tender timeline" },
            "problem" => factor with { DisplayLabel = "Logistics pain severity" },
            "economicBuyer" => factor with { DisplayLabel = "Shipping decision maker" },
            "icpFit" => factor with { DisplayLabel = "Shipper fit" },
            _ => factor
        };
    }

    private static QualificationFactorEvidenceRule ApplyTruckingSystemEvidenceRules(QualificationFactorEvidenceRule rule)
    {
        IReadOnlyList<string> allowedEvidence =
        [
            "No evidence yet",
            "Customer call",
            "Call notes",
            "Discovery call notes",
            "Meeting notes",
            "Email confirmation",
            "Rate confirmation",
            "Lane history",
            "Load tender",
            "EDI or portal request",
            "Service scorecard",
            "Written confirmation",
            "Org chart reference"
        ];

        return rule.FactorKey switch
        {
            "budget" or "readiness" or "timeline" or "problem" or "economicBuyer" or "icpFit" => rule with
            {
                AllowedEvidenceSources = allowedEvidence
            },
            _ => rule
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
            VerticalPresetIds.TruckingCarrierBroker =>
            [
                new OpportunityStagePresetDefinition("Prospecting", 1, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Qualified", 2, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Lane Review", 3, false, "Pipeline"),
                new OpportunityStagePresetDefinition("Quoted", 4, false, "Best Case"),
                new OpportunityStagePresetDefinition("Tender Received", 5, false, "Best Case"),
                new OpportunityStagePresetDefinition("Booked", 6, false, "Commit"),
                new OpportunityStagePresetDefinition("In Transit", 7, false, "Commit"),
                new OpportunityStagePresetDefinition("Delivered", 8, false, "Commit"),
                new OpportunityStagePresetDefinition("Invoiced", 9, false, "Commit"),
                new OpportunityStagePresetDefinition("Closed Won", 10, true, "Closed"),
                new OpportunityStagePresetDefinition("Closed Lost", 11, true, "Omitted")
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

    public static VerticalLeadProfileCatalog CreateCatalog(
        IReadOnlyDictionary<string, IReadOnlyList<string>>? fields = null)
    {
        return new VerticalLeadProfileCatalog
        {
            Fields = fields ?? new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase)
        };
    }

    public static VerticalLeadProfileCatalog MergeCatalog(
        VerticalLeadProfileCatalog? current,
        BrokerageLeadProfileCatalog? legacyBrokerageCatalog,
        VerticalLeadProfileCatalog fallback)
    {
        var merged = new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase);

        foreach (var (key, values) in fallback.Fields)
        {
            merged[key] = NormalizeFieldValues(values);
        }

        foreach (var (key, values) in ToFieldDictionary(legacyBrokerageCatalog))
        {
            if (values.Count > 0)
            {
                merged[key] = values;
            }
        }

        if (current?.Fields is not null)
        {
            foreach (var (key, values) in current.Fields)
            {
                var normalized = NormalizeFieldValues(values);
                if (normalized.Count > 0)
                {
                    merged[key] = normalized;
                }
            }
        }

        return CreateCatalog(merged);
    }

    private static BrokerageLeadProfileCatalog ToLegacyBrokerageCatalog(VerticalLeadProfileCatalog? catalog)
    {
        return new BrokerageLeadProfileCatalog(
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokerageBuyerTypes),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokerageMotivationUrgencies),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokerageFinancingReadinessOptions),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokeragePreApprovalStatuses),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokeragePreferredAreas),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokeragePropertyTypes),
            GetFieldValues(catalog, VerticalLeadProfileFieldKeys.BrokerageBudgetBands));
    }

    private static IReadOnlyDictionary<string, IReadOnlyList<string>> ToFieldDictionary(BrokerageLeadProfileCatalog? catalog)
    {
        if (catalog is null)
        {
            return new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase);
        }

        return new Dictionary<string, IReadOnlyList<string>>(StringComparer.OrdinalIgnoreCase)
        {
            [VerticalLeadProfileFieldKeys.BrokerageBuyerTypes] = NormalizeFieldValues(catalog.BuyerTypes),
            [VerticalLeadProfileFieldKeys.BrokerageMotivationUrgencies] = NormalizeFieldValues(catalog.MotivationUrgencies),
            [VerticalLeadProfileFieldKeys.BrokerageFinancingReadinessOptions] = NormalizeFieldValues(catalog.FinancingReadinessOptions),
            [VerticalLeadProfileFieldKeys.BrokeragePreApprovalStatuses] = NormalizeFieldValues(catalog.PreApprovalStatuses),
            [VerticalLeadProfileFieldKeys.BrokeragePreferredAreas] = NormalizeFieldValues(catalog.PreferredAreas),
            [VerticalLeadProfileFieldKeys.BrokeragePropertyTypes] = NormalizeFieldValues(catalog.PropertyTypes),
            [VerticalLeadProfileFieldKeys.BrokerageBudgetBands] = NormalizeFieldValues(catalog.BudgetBands)
        };
    }

    private static IReadOnlyList<string> GetFieldValues(VerticalLeadProfileCatalog? catalog, string key)
    {
        if (catalog?.Fields is null || !catalog.Fields.TryGetValue(key, out var values))
        {
            return [];
        }

        return NormalizeFieldValues(values);
    }

    private static IReadOnlyList<string> NormalizeFieldValues(IReadOnlyList<string>? values)
    {
        if (values is null || values.Count == 0)
        {
            return [];
        }

        var deduped = new List<string>();
        foreach (var value in values)
        {
            var candidate = (value ?? string.Empty).Trim();
            if (candidate.Length == 0 || deduped.Any(existing => string.Equals(existing, candidate, StringComparison.OrdinalIgnoreCase)))
            {
                continue;
            }

            deduped.Add(candidate);
        }

        return deduped;
    }

    private static IReadOnlyList<QualificationFactorDefinition> BuildTruckingQualificationFactors()
    {
        return
        [
            new(
                VerticalLeadProfileFieldKeys.TruckingShipperTypes,
                "Shipper type",
                true,
                false,
                110,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Retail shipper",
                    "Manufacturer",
                    "Food and beverage",
                    "E-commerce distributor",
                    "Third-party logistics provider",
                    "Freight broker"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingFreightModes,
                "Freight mode",
                true,
                false,
                120,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "FTL",
                    "LTL",
                    "Drayage",
                    "Reefer",
                    "Flatbed",
                    "Intermodal"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingEquipmentTypes,
                "Equipment type",
                true,
                false,
                130,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Dry van",
                    "Reefer",
                    "Flatbed",
                    "Step deck",
                    "Power only",
                    "Container chassis"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingCommodities,
                "Commodity",
                true,
                false,
                140,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "General merchandise",
                    "Food and beverage",
                    "Consumer packaged goods",
                    "Automotive",
                    "Building materials",
                    "Hazmat"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingOriginRegions,
                "Origin region",
                true,
                false,
                150,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Ontario",
                    "Quebec",
                    "Midwest",
                    "Southeast",
                    "Texas",
                    "Northeast"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingDestinationRegions,
                "Destination region",
                true,
                false,
                160,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Ontario",
                    "Quebec",
                    "Midwest",
                    "Southeast",
                    "Texas",
                    "Northeast"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingShipmentFrequencyBands,
                "Shipment frequency",
                true,
                false,
                170,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Ad hoc / spot only",
                    "Weekly",
                    "Several loads per week",
                    "Daily",
                    "Dedicated volume"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingAnnualFreightSpendBands,
                "Annual freight spend",
                true,
                false,
                180,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Under $250k",
                    "$250k - $1M",
                    "$1M - $5M",
                    "$5M - $15M",
                    "$15M+"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingServiceSensitivityLevels,
                "Service sensitivity",
                true,
                false,
                190,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Flexible",
                    "Appointment-sensitive",
                    "Time-critical",
                    "High compliance",
                    "White-glove"
                ]),
            new(
                VerticalLeadProfileFieldKeys.TruckingPricingSensitivityLevels,
                "Pricing sensitivity",
                true,
                false,
                200,
                QualificationFactorTypes.Custom,
                QualificationFactorValueTypes.SingleSelect,
                false,
                [
                    "Rate-first",
                    "Balanced rate and service",
                    "Service-first",
                    "Dedicated capacity priority"
                ])
        ];
    }

    private static IReadOnlyList<QualificationFactorEvidenceRule> BuildTruckingEvidenceRules()
    {
        IReadOnlyList<string> allowedEvidence =
        [
            "No evidence yet",
            "Customer call",
            "Call notes",
            "Discovery call notes",
            "Meeting notes",
            "Email confirmation",
            "Rate confirmation",
            "Lane history",
            "Load tender",
            "EDI or portal request",
            "Service scorecard"
        ];

        return
        [
            new(VerticalLeadProfileFieldKeys.TruckingShipperTypes, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingFreightModes, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingEquipmentTypes, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingCommodities, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingOriginRegions, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingDestinationRegions, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingShipmentFrequencyBands, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingAnnualFreightSpendBands, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingServiceSensitivityLevels, false, allowedEvidence),
            new(VerticalLeadProfileFieldKeys.TruckingPricingSensitivityLevels, false, allowedEvidence)
        ];
    }
}
