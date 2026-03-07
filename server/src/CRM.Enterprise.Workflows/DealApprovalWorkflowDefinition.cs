using CRM.Enterprise.Application.Approvals;

namespace CRM.Enterprise.Workflows;

public sealed record DealApprovalWorkflowDefinition(
    bool Enabled,
    DealApprovalWorkflowScopeDefinition Scope,
    IReadOnlyList<DealApprovalWorkflowStepDefinition> Steps,
    IReadOnlyList<DealApprovalWorkflowNodeDefinition> Nodes,
    IReadOnlyList<DealApprovalWorkflowConnectionDefinition> Connections)
{
    public static DealApprovalWorkflowDefinition CreateTemplate(string defaultApproverRole, decimal? defaultThreshold)
    {
        var role = string.IsNullOrWhiteSpace(defaultApproverRole) ? "Sales Manager" : defaultApproverRole.Trim();
        var stepNodeId = "approval-step-1";

        return new DealApprovalWorkflowDefinition(
            true,
            DealApprovalWorkflowScopeDefinition.Default(),
            new[]
            {
                new DealApprovalWorkflowStepDefinition(1, role, defaultThreshold, "Deal Approval", stepNodeId)
            },
            new[]
            {
                new DealApprovalWorkflowNodeDefinition("start", "start", 40, 180, "Start"),
                new DealApprovalWorkflowNodeDefinition(stepNodeId, "approval", 300, 180, "Step 1"),
                new DealApprovalWorkflowNodeDefinition("end", "end", 560, 180, "End")
            },
            new[]
            {
                new DealApprovalWorkflowConnectionDefinition("start", stepNodeId),
                new DealApprovalWorkflowConnectionDefinition(stepNodeId, "end")
            });
    }
}

public sealed record DealApprovalWorkflowScopeDefinition(
    string Name,
    string Purpose,
    string Module,
    string Pipeline,
    string Stage,
    string Trigger,
    string Status,
    int Version)
{
    public static DealApprovalWorkflowScopeDefinition Default() =>
        new(
            "Deal Approval Workflow",
            "Control discount and commercial approvals for opportunities.",
            "opportunities",
            "default",
            "proposal",
            "on-stage-change",
            "draft",
            1);
}

public sealed record DealApprovalWorkflowStepDefinition(
    int Order,
    string ApproverRole,
    decimal? AmountThreshold,
    string? Purpose,
    string? NodeId);

public sealed record DealApprovalWorkflowNodeDefinition(
    string Id,
    string Type,
    double X,
    double Y,
    string? Label);

public sealed record DealApprovalWorkflowConnectionDefinition(
    string Source,
    string Target);

public static class DealApprovalWorkflowMapper
{
    private static readonly HashSet<string> SupportedNodeTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "start",
        "approval",
        "condition",
        "email",
        "notification",
        "delay",
        "crm-update",
        "activity",
        "end"
    };

    public static DealApprovalWorkflowDefinition FromStoredJson(string? json, decimal? tenantThreshold, string? tenantApproverRole)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(tenantApproverRole ?? string.Empty, tenantThreshold);
        }

        try
        {
            var stored = System.Text.Json.JsonSerializer.Deserialize<DealApprovalWorkflowDefinition>(json);
            if (stored is not null)
            {
                return Normalize(stored);
            }
        }
        catch (System.Text.Json.JsonException)
        {
            // Fall through to legacy policy parsing.
        }

        try
        {
            var policy = System.Text.Json.JsonSerializer.Deserialize<ApprovalWorkflowPolicy>(json);
            return FromPolicy(policy, tenantThreshold, tenantApproverRole);
        }
        catch (System.Text.Json.JsonException)
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(tenantApproverRole ?? string.Empty, tenantThreshold);
        }
    }

    public static DealApprovalWorkflowDefinition FromPolicy(ApprovalWorkflowPolicy? policy, decimal? tenantThreshold, string? tenantApproverRole)
    {
        if (policy is null || policy.Steps is null || !policy.Steps.Any())
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(
                tenantApproverRole ?? string.Empty,
                tenantThreshold);
        }

        var normalizedSteps = NormalizeSteps(policy.Steps.Select((s, index) =>
            new DealApprovalWorkflowStepDefinition(
                s.Order,
                s.ApproverRole,
                s.AmountThreshold,
                s.Purpose,
                $"approval-step-{index + 1}")));

        return Normalize(new DealApprovalWorkflowDefinition(
            policy.Enabled,
            DealApprovalWorkflowScopeDefinition.Default(),
            normalizedSteps,
            Array.Empty<DealApprovalWorkflowNodeDefinition>(),
            Array.Empty<DealApprovalWorkflowConnectionDefinition>()));
    }

    public static ApprovalWorkflowPolicy ToPolicy(DealApprovalWorkflowDefinition definition)
    {
        var normalized = Normalize(definition);
        if (!normalized.Enabled)
        {
            return ApprovalWorkflowPolicy.Disabled();
        }

        return new ApprovalWorkflowPolicy(
            true,
            normalized.Steps.Select(step =>
                    new ApprovalWorkflowStep(step.Order, step.ApproverRole, step.AmountThreshold, step.Purpose))
                .ToArray());
    }

    public static DealApprovalWorkflowDefinition Normalize(DealApprovalWorkflowDefinition definition)
    {
        var steps = NormalizeSteps(definition.Steps ?? Array.Empty<DealApprovalWorkflowStepDefinition>());
        var enabled = definition.Enabled && steps.Count > 0;
        var scope = NormalizeScope(definition.Scope);
        var nodes = NormalizeNodes(definition.Nodes ?? Array.Empty<DealApprovalWorkflowNodeDefinition>(), steps);
        var connections = NormalizeConnections(definition.Connections ?? Array.Empty<DealApprovalWorkflowConnectionDefinition>(), nodes, steps);

        return new DealApprovalWorkflowDefinition(enabled, scope, steps, nodes, connections);
    }

    public static IReadOnlyList<string> ValidateStructure(DealApprovalWorkflowDefinition definition)
    {
        var errors = new List<string>();
        var steps = definition.Steps ?? Array.Empty<DealApprovalWorkflowStepDefinition>();
        var nodes = definition.Nodes ?? Array.Empty<DealApprovalWorkflowNodeDefinition>();

        foreach (var node in nodes)
        {
            if (string.IsNullOrWhiteSpace(node.Id))
            {
                errors.Add("Each node must define an id.");
                continue;
            }

            var type = NormalizeNodeType(node.Type, node.Id);
            if (!SupportedNodeTypes.Contains(type))
            {
                errors.Add($"Unsupported node type '{node.Type}' for node '{node.Id}'.");
            }
        }

        var duplicateNodeIds = nodes
            .Where(node => !string.IsNullOrWhiteSpace(node.Id))
            .GroupBy(node => node.Id.Trim(), StringComparer.OrdinalIgnoreCase)
            .Where(group => group.Count() > 1)
            .Select(group => group.Key)
            .ToArray();

        if (duplicateNodeIds.Length > 0)
        {
            errors.Add($"Duplicate node ids are not allowed: {string.Join(", ", duplicateNodeIds)}.");
        }

        if (steps.Any(step => string.IsNullOrWhiteSpace(step.ApproverRole)))
        {
            errors.Add("Each approval step must define an approver role.");
        }

        if (string.IsNullOrWhiteSpace(definition.Scope.Name))
        {
            errors.Add("Workflow name is required.");
        }

        if (definition.Scope.Version < 1)
        {
            errors.Add("Workflow version must be 1 or greater.");
        }

        return errors;
    }

    private static DealApprovalWorkflowScopeDefinition NormalizeScope(DealApprovalWorkflowScopeDefinition? scope)
    {
        var fallback = DealApprovalWorkflowScopeDefinition.Default();
        if (scope is null)
        {
            return fallback;
        }

        var status = string.IsNullOrWhiteSpace(scope.Status) ? fallback.Status : scope.Status.Trim().ToLowerInvariant();
        if (status != "draft" && status != "published")
        {
            status = fallback.Status;
        }

        return new DealApprovalWorkflowScopeDefinition(
            string.IsNullOrWhiteSpace(scope.Name) ? fallback.Name : scope.Name.Trim(),
            string.IsNullOrWhiteSpace(scope.Purpose) ? fallback.Purpose : scope.Purpose.Trim(),
            string.IsNullOrWhiteSpace(scope.Module) ? fallback.Module : scope.Module.Trim(),
            string.IsNullOrWhiteSpace(scope.Pipeline) ? fallback.Pipeline : scope.Pipeline.Trim(),
            string.IsNullOrWhiteSpace(scope.Stage) ? fallback.Stage : scope.Stage.Trim(),
            string.IsNullOrWhiteSpace(scope.Trigger) ? fallback.Trigger : scope.Trigger.Trim(),
            status,
            scope.Version <= 0 ? 1 : scope.Version);
    }

    private static IReadOnlyList<DealApprovalWorkflowStepDefinition> NormalizeSteps(IEnumerable<DealApprovalWorkflowStepDefinition> steps)
    {
        return (steps ?? Enumerable.Empty<DealApprovalWorkflowStepDefinition>())
            .Where(step => !string.IsNullOrWhiteSpace(step.ApproverRole))
            .OrderBy(step => step.Order)
            .Select((step, index) => new DealApprovalWorkflowStepDefinition(
                index + 1,
                step.ApproverRole.Trim(),
                step.AmountThreshold,
                string.IsNullOrWhiteSpace(step.Purpose) ? null : step.Purpose.Trim(),
                string.IsNullOrWhiteSpace(step.NodeId) ? $"approval-step-{index + 1}" : step.NodeId.Trim()))
            .ToArray();
    }

    private static IReadOnlyList<DealApprovalWorkflowNodeDefinition> NormalizeNodes(
        IReadOnlyList<DealApprovalWorkflowNodeDefinition> nodes,
        IReadOnlyList<DealApprovalWorkflowStepDefinition> steps)
    {
        var result = new List<DealApprovalWorkflowNodeDefinition>();
        var seenIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var stepNodeIds = steps.Select(step => step.NodeId).Where(nodeId => !string.IsNullOrWhiteSpace(nodeId))
            .Select(nodeId => nodeId!.Trim())
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        var normalizedInputNodes = nodes
            .Where(node => !string.IsNullOrWhiteSpace(node.Id))
            .Select(node =>
            {
                var id = node.Id.Trim();
                var type = NormalizeNodeType(node.Type, id);
                return node with { Id = id, Type = type };
            })
            .Where(node => SupportedNodeTypes.Contains(node.Type))
            .ToArray();

        var start = normalizedInputNodes.FirstOrDefault(node => string.Equals(node.Type, "start", StringComparison.OrdinalIgnoreCase) || node.Id == "start")
                    ?? new DealApprovalWorkflowNodeDefinition("start", "start", 40, 180, "Start");
        result.Add(start with
        {
            Id = "start",
            Type = "start",
            Label = string.IsNullOrWhiteSpace(start.Label) ? "Start" : start.Label.Trim()
        });
        seenIds.Add("start");

        foreach (var node in normalizedInputNodes.Where(node =>
                     !string.Equals(node.Type, "start", StringComparison.OrdinalIgnoreCase)
                     && !string.Equals(node.Type, "end", StringComparison.OrdinalIgnoreCase)
                     && !string.Equals(node.Type, "approval", StringComparison.OrdinalIgnoreCase)
                     && !stepNodeIds.Contains(node.Id)))
        {
            if (seenIds.Add(node.Id))
            {
                result.Add(node with { Label = string.IsNullOrWhiteSpace(node.Label) ? DefaultNodeLabel(node.Type) : node.Label.Trim() });
            }
        }

        for (var index = 0; index < steps.Count; index += 1)
        {
            var step = steps[index];
            var nodeId = step.NodeId ?? $"approval-step-{index + 1}";
            var existing = normalizedInputNodes.FirstOrDefault(node => string.Equals(node.Id, nodeId, StringComparison.OrdinalIgnoreCase));
            if (seenIds.Add(nodeId))
            {
                result.Add(existing is null
                    ? new DealApprovalWorkflowNodeDefinition(nodeId, "approval", 40 + (index + 1) * 260, 180, $"Step {index + 1}")
                    : existing with
                    {
                        Type = "approval",
                        Label = string.IsNullOrWhiteSpace(existing.Label) ? $"Step {index + 1}" : existing.Label.Trim()
                    });
            }
        }

        var endDefaultX = 40 + (steps.Count + 1) * 260;
        var end = normalizedInputNodes.FirstOrDefault(node => string.Equals(node.Type, "end", StringComparison.OrdinalIgnoreCase) || node.Id == "end")
                  ?? new DealApprovalWorkflowNodeDefinition("end", "end", endDefaultX, 180, "End");
        result.Add(end with
        {
            Id = "end",
            Type = "end",
            Label = string.IsNullOrWhiteSpace(end.Label) ? "End" : end.Label.Trim()
        });
        seenIds.Add("end");

        return result;
    }

    private static IReadOnlyList<DealApprovalWorkflowConnectionDefinition> NormalizeConnections(
        IReadOnlyList<DealApprovalWorkflowConnectionDefinition> connections,
        IReadOnlyList<DealApprovalWorkflowNodeDefinition> nodes,
        IReadOnlyList<DealApprovalWorkflowStepDefinition> steps)
    {
        var nodeIds = nodes.Select(node => node.Id).ToHashSet(StringComparer.Ordinal);
        var valid = connections
            .Where(connection => !string.IsNullOrWhiteSpace(connection.Source)
                                 && !string.IsNullOrWhiteSpace(connection.Target)
                                 && nodeIds.Contains(connection.Source)
                                 && nodeIds.Contains(connection.Target)
                                 && connection.Source != connection.Target)
            .DistinctBy(connection => $"{connection.Source}->{connection.Target}")
            .ToList();

        if (valid.Count > 0)
        {
            return valid;
        }

        var fallback = new List<DealApprovalWorkflowConnectionDefinition>();
        var previous = "start";
        foreach (var step in steps)
        {
            if (!string.IsNullOrWhiteSpace(step.NodeId))
            {
                fallback.Add(new DealApprovalWorkflowConnectionDefinition(previous, step.NodeId));
                previous = step.NodeId;
            }
        }

        fallback.Add(new DealApprovalWorkflowConnectionDefinition(previous, "end"));
        return fallback;
    }

    private static string NormalizeNodeType(string? type, string id)
    {
        var normalizedType = string.IsNullOrWhiteSpace(type) ? string.Empty : type.Trim().ToLowerInvariant();
        if (!string.IsNullOrWhiteSpace(normalizedType))
        {
            return normalizedType;
        }

        if (string.Equals(id, "start", StringComparison.OrdinalIgnoreCase))
        {
            return "start";
        }

        if (string.Equals(id, "end", StringComparison.OrdinalIgnoreCase))
        {
            return "end";
        }

        return string.Empty;
    }

    private static string DefaultNodeLabel(string type)
    {
        if (string.Equals(type, "condition", StringComparison.OrdinalIgnoreCase)) return "Condition";
        if (string.Equals(type, "email", StringComparison.OrdinalIgnoreCase)) return "Email";
        if (string.Equals(type, "notification", StringComparison.OrdinalIgnoreCase)) return "Notification";
        if (string.Equals(type, "delay", StringComparison.OrdinalIgnoreCase)) return "Delay";
        if (string.Equals(type, "crm-update", StringComparison.OrdinalIgnoreCase)) return "CRM Update";
        if (string.Equals(type, "activity", StringComparison.OrdinalIgnoreCase)) return "Activity";
        if (string.Equals(type, "approval", StringComparison.OrdinalIgnoreCase)) return "Approval Step";
        if (string.Equals(type, "start", StringComparison.OrdinalIgnoreCase)) return "Start";
        if (string.Equals(type, "end", StringComparison.OrdinalIgnoreCase)) return "End";
        return "Node";
    }
}
