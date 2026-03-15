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
                new DealApprovalWorkflowStepDefinition(1, null, role, null, defaultThreshold, "Deal Approval", stepNodeId)
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
    Guid? ApproverRoleId,
    string ApproverRole,
    Guid? MinimumSecurityLevelId,
    decimal? AmountThreshold,
    string? Purpose,
    string? NodeId);

public sealed record DealApprovalWorkflowNodeDefinition(
    string Id,
    string Type,
    double X,
    double Y,
    string? Label,
    DealApprovalWorkflowNodeConfigDefinition? Config = null);

public sealed record DealApprovalWorkflowConnectionDefinition(
    string Source,
    string Target,
    string? Label = null,
    string? BranchKey = null);

public sealed record DealApprovalWorkflowNodeConfigDefinition(
    DealApprovalWorkflowConditionConfigDefinition? Condition = null,
    DealApprovalWorkflowDelayConfigDefinition? Delay = null,
    DealApprovalWorkflowEmailConfigDefinition? Email = null,
    DealApprovalWorkflowNotificationConfigDefinition? Notification = null,
    DealApprovalWorkflowCrmUpdateConfigDefinition? CrmUpdate = null,
    DealApprovalWorkflowActivityConfigDefinition? Activity = null);

public sealed record DealApprovalWorkflowConditionConfigDefinition(
    string? Field,
    string? Operator,
    string? Value);

public sealed record DealApprovalWorkflowDelayConfigDefinition(
    int? Duration,
    string? Unit,
    bool BusinessHoursOnly);

public sealed record DealApprovalWorkflowEmailConfigDefinition(
    string? Template,
    string? RecipientType,
    string? Subject);

public sealed record DealApprovalWorkflowNotificationConfigDefinition(
    string? Channel,
    string? Audience,
    string? Message);

public sealed record DealApprovalWorkflowCrmUpdateConfigDefinition(
    string? Field,
    string? Value);

public sealed record DealApprovalWorkflowActivityConfigDefinition(
    string? ActivityType,
    string? Subject,
    string? OwnerStrategy,
    int? DueInHours);

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
            var stored = System.Text.Json.JsonSerializer.Deserialize<DealApprovalWorkflowDefinition>(json, new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web));
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
            var policy = System.Text.Json.JsonSerializer.Deserialize<ApprovalWorkflowPolicy>(json, new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web));
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
                    s.ApproverRoleId,
                    s.ApproverRole,
                    s.MinimumSecurityLevelId,
                    s.AmountThreshold,
                    s.Purpose,
                    s.NodeId ?? $"approval-step-{index + 1}")));

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
                new ApprovalWorkflowStep(step.Order, step.ApproverRoleId, step.ApproverRole, step.MinimumSecurityLevelId, step.AmountThreshold, step.Purpose, step.NodeId))
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
        var connections = definition.Connections ?? Array.Empty<DealApprovalWorkflowConnectionDefinition>();
        var isPublished = definition.Enabled
            || string.Equals(definition.Scope.Status, "published", StringComparison.OrdinalIgnoreCase);
        var normalizedNodes = nodes
            .Where(node => !string.IsNullOrWhiteSpace(node.Id))
            .Select(node => new
            {
                Id = node.Id.Trim(),
                Type = NormalizeNodeType(node.Type, node.Id.Trim())
            })
            .ToArray();
        var startNodes = normalizedNodes.Where(node => string.Equals(node.Type, "start", StringComparison.OrdinalIgnoreCase)).ToArray();
        var endNodes = normalizedNodes.Where(node => string.Equals(node.Type, "end", StringComparison.OrdinalIgnoreCase)).ToArray();
        var approvalNodes = normalizedNodes.Where(node => string.Equals(node.Type, "approval", StringComparison.OrdinalIgnoreCase)).ToArray();
        var nodeIds = normalizedNodes.Select(node => node.Id).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var normalizedConnections = connections
            .Where(connection => !string.IsNullOrWhiteSpace(connection.Source) && !string.IsNullOrWhiteSpace(connection.Target))
            .Select(connection => new ConnectionEdge(
                connection.Source.Trim(),
                connection.Target.Trim(),
                string.IsNullOrWhiteSpace(connection.Label) ? null : connection.Label.Trim(),
                string.IsNullOrWhiteSpace(connection.BranchKey) ? null : connection.BranchKey.Trim()))
            .ToArray();

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

        if (startNodes.Length != 1)
        {
            errors.Add("Workflow must define exactly one start node.");
        }

        if (endNodes.Length != 1)
        {
            errors.Add("Workflow must define exactly one end node.");
        }

        if (approvalNodes.Length == 0)
        {
            errors.Add("Workflow must include at least one approval node.");
        }

        var stepNodeIds = steps
            .Select(step => step.NodeId)
            .Where(nodeId => !string.IsNullOrWhiteSpace(nodeId))
            .Select(nodeId => nodeId!.Trim())
            .ToArray();

        foreach (var stepNodeId in stepNodeIds.Where(stepNodeId => !nodeIds.Contains(stepNodeId)))
        {
            errors.Add($"Approval step node '{stepNodeId}' is missing from the workflow graph.");
        }

        foreach (var approvalNodeId in approvalNodes.Select(node => node.Id).Where(nodeId => !stepNodeIds.Contains(nodeId, StringComparer.OrdinalIgnoreCase)))
        {
            errors.Add($"Approval node '{approvalNodeId}' does not map to an approval step.");
        }

        foreach (var node in nodes.Where(node => !string.IsNullOrWhiteSpace(node.Id)))
        {
            ValidateNodeConfig(node, normalizedConnections, errors);
        }

        foreach (var connection in normalizedConnections)
        {
            if (!nodeIds.Contains(connection.Source) || !nodeIds.Contains(connection.Target))
            {
                errors.Add($"Connection '{connection.Source} -> {connection.Target}' references an unknown node.");
            }
        }

        if (normalizedConnections.Length == 0)
        {
            errors.Add("Workflow must define at least one connection.");
        }

        if (startNodes.Length == 1 && endNodes.Length == 1 && normalizedConnections.Length > 0)
        {
            var incoming = normalizedConnections
                .GroupBy(connection => connection.Target, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);
            var outgoing = normalizedConnections
                .GroupBy(connection => connection.Source, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);

            foreach (var node in normalizedNodes)
            {
                if (!string.Equals(node.Type, "start", StringComparison.OrdinalIgnoreCase)
                    && !incoming.ContainsKey(node.Id))
                {
                    errors.Add($"Node '{node.Id}' has no incoming connection.");
                }

                if (!string.Equals(node.Type, "end", StringComparison.OrdinalIgnoreCase)
                    && !outgoing.ContainsKey(node.Id))
                {
                    errors.Add($"Node '{node.Id}' has no outgoing connection.");
                }
            }

            var reachableFromStart = Traverse(normalizedConnections, startNodes[0].Id, useSource: true);
            foreach (var node in normalizedNodes.Where(node => !reachableFromStart.Contains(node.Id)))
            {
                errors.Add($"Node '{node.Id}' is not reachable from the start node.");
            }

            var canReachEnd = Traverse(normalizedConnections, endNodes[0].Id, useSource: false);
            foreach (var node in normalizedNodes.Where(node => !canReachEnd.Contains(node.Id)))
            {
                errors.Add($"Node '{node.Id}' does not lead to the end node.");
            }
        }

        if (string.IsNullOrWhiteSpace(definition.Scope.Name))
        {
            errors.Add("Workflow name is required.");
        }

        if (isPublished)
        {
            if (string.IsNullOrWhiteSpace(definition.Scope.Purpose))
            {
                errors.Add("Workflow purpose is required before publishing.");
            }

            if (string.IsNullOrWhiteSpace(definition.Scope.Module))
            {
                errors.Add("Workflow module is required before publishing.");
            }

            if (string.IsNullOrWhiteSpace(definition.Scope.Pipeline))
            {
                errors.Add("Workflow pipeline is required before publishing.");
            }

            if (string.IsNullOrWhiteSpace(definition.Scope.Stage))
            {
                errors.Add("Workflow stage is required before publishing.");
            }

            if (string.IsNullOrWhiteSpace(definition.Scope.Trigger))
            {
                errors.Add("Workflow trigger is required before publishing.");
            }
        }

        if (definition.Scope.Version < 1)
        {
            errors.Add("Workflow version must be 1 or greater.");
        }

        return errors.Distinct(StringComparer.Ordinal).ToArray();
    }

    private static void ValidateNodeConfig(
        DealApprovalWorkflowNodeDefinition node,
        IReadOnlyList<ConnectionEdge> connections,
        ICollection<string> errors)
    {
        var nodeType = NormalizeNodeType(node.Type, node.Id);
        var config = NormalizeNodeConfig(node.Config);
        var outgoing = connections.Where(connection => string.Equals(connection.Source, node.Id, StringComparison.OrdinalIgnoreCase)).ToArray();

        if (string.Equals(nodeType, "condition", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(config.Condition?.Field)
                || string.IsNullOrWhiteSpace(config.Condition?.Operator)
                || string.IsNullOrWhiteSpace(config.Condition?.Value))
            {
                errors.Add($"Condition node '{node.Id}' must define field, operator, and value.");
            }

            if (outgoing.Length < 2)
            {
                errors.Add($"Condition node '{node.Id}' must have at least two outgoing branches.");
            }

            if (outgoing.Any(connection => string.IsNullOrWhiteSpace(connection.Label)))
            {
                errors.Add($"Condition node '{node.Id}' requires labels on all outgoing branches.");
            }
        }

        if (string.Equals(nodeType, "delay", StringComparison.OrdinalIgnoreCase))
        {
            if (!config.Delay?.Duration.HasValue ?? true || config.Delay.Duration <= 0)
            {
                errors.Add($"Delay node '{node.Id}' must define a duration greater than zero.");
            }
        }

        if (string.Equals(nodeType, "email", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(config.Email?.Template)
                && string.IsNullOrWhiteSpace(config.Email?.Subject))
            {
                errors.Add($"Email node '{node.Id}' must define a template or subject.");
            }
        }

        if (string.Equals(nodeType, "notification", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(config.Notification?.Channel)
                || string.IsNullOrWhiteSpace(config.Notification?.Audience))
            {
                errors.Add($"Notification node '{node.Id}' must define channel and audience.");
            }
        }

        if (string.Equals(nodeType, "crm-update", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(config.CrmUpdate?.Field)
                || string.IsNullOrWhiteSpace(config.CrmUpdate?.Value))
            {
                errors.Add($"CRM update node '{node.Id}' must define field and value.");
            }
        }

        if (string.Equals(nodeType, "activity", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(config.Activity?.ActivityType)
                || string.IsNullOrWhiteSpace(config.Activity?.Subject))
            {
                errors.Add($"Activity node '{node.Id}' must define activity type and subject.");
            }
        }
    }

    private static HashSet<string> Traverse(IEnumerable<ConnectionEdge> connections, string startNodeId, bool useSource)
    {
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { startNodeId };
        var queue = new Queue<string>();
        queue.Enqueue(startNodeId);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            foreach (var connection in connections)
            {
                var from = useSource ? connection.Source : connection.Target;
                var to = useSource ? connection.Target : connection.Source;
                if (!string.Equals(from, current, StringComparison.OrdinalIgnoreCase) || visited.Contains(to))
                {
                    continue;
                }

                visited.Add(to);
                queue.Enqueue(to);
            }
        }

        return visited;
    }

    private sealed record ConnectionEdge(string Source, string Target, string? Label, string? BranchKey);

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
            NormalizeScopeValue(scope.Name, fallback.Name),
            NormalizeScopeValue(scope.Purpose, fallback.Purpose),
            NormalizeScopeValue(scope.Module, fallback.Module),
            NormalizeScopeValue(scope.Pipeline, fallback.Pipeline),
            NormalizeScopeValue(scope.Stage, fallback.Stage),
            NormalizeScopeValue(scope.Trigger, fallback.Trigger),
            status,
            scope.Version <= 0 ? 1 : scope.Version);
    }

    private static string NormalizeScopeValue(string? value, string fallback)
    {
        return value is null ? fallback : value.Trim();
    }

    private static IReadOnlyList<DealApprovalWorkflowStepDefinition> NormalizeSteps(IEnumerable<DealApprovalWorkflowStepDefinition> steps)
    {
        return (steps ?? Enumerable.Empty<DealApprovalWorkflowStepDefinition>())
            .Where(step => !string.IsNullOrWhiteSpace(step.ApproverRole))
            .OrderBy(step => step.Order)
            .Select((step, index) => new DealApprovalWorkflowStepDefinition(
                index + 1,
                step.ApproverRoleId,
                step.ApproverRole.Trim(),
                step.MinimumSecurityLevelId,
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
                result.Add(node with
                {
                    Label = string.IsNullOrWhiteSpace(node.Label) ? DefaultNodeLabel(node.Type) : node.Label.Trim(),
                    Config = NormalizeNodeConfig(node.Config)
                });
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
                        Label = string.IsNullOrWhiteSpace(existing.Label) ? $"Step {index + 1}" : existing.Label.Trim(),
                        Config = NormalizeNodeConfig(existing.Config)
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
            .Select(connection => connection with
            {
                Source = connection.Source.Trim(),
                Target = connection.Target.Trim(),
                Label = string.IsNullOrWhiteSpace(connection.Label) ? null : connection.Label.Trim(),
                BranchKey = string.IsNullOrWhiteSpace(connection.BranchKey) ? null : connection.BranchKey.Trim()
            })
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

    private static DealApprovalWorkflowNodeConfigDefinition NormalizeNodeConfig(DealApprovalWorkflowNodeConfigDefinition? config)
    {
        if (config is null)
        {
            return new DealApprovalWorkflowNodeConfigDefinition();
        }

        return new DealApprovalWorkflowNodeConfigDefinition(
            config.Condition is null
                ? null
                : new DealApprovalWorkflowConditionConfigDefinition(
                    NormalizeOptional(config.Condition.Field),
                    NormalizeOptional(config.Condition.Operator),
                    NormalizeOptional(config.Condition.Value)),
            config.Delay is null
                ? null
                : new DealApprovalWorkflowDelayConfigDefinition(
                    config.Delay.Duration is > 0 ? config.Delay.Duration : null,
                    NormalizeOptional(config.Delay.Unit) ?? "hours",
                    config.Delay.BusinessHoursOnly),
            config.Email is null
                ? null
                : new DealApprovalWorkflowEmailConfigDefinition(
                    NormalizeOptional(config.Email.Template),
                    NormalizeOptional(config.Email.RecipientType),
                    NormalizeOptional(config.Email.Subject)),
            config.Notification is null
                ? null
                : new DealApprovalWorkflowNotificationConfigDefinition(
                    NormalizeOptional(config.Notification.Channel),
                    NormalizeOptional(config.Notification.Audience),
                    NormalizeOptional(config.Notification.Message)),
            config.CrmUpdate is null
                ? null
                : new DealApprovalWorkflowCrmUpdateConfigDefinition(
                    NormalizeOptional(config.CrmUpdate.Field),
                    NormalizeOptional(config.CrmUpdate.Value)),
            config.Activity is null
                ? null
                : new DealApprovalWorkflowActivityConfigDefinition(
                    NormalizeOptional(config.Activity.ActivityType),
                    NormalizeOptional(config.Activity.Subject),
                    NormalizeOptional(config.Activity.OwnerStrategy),
                    config.Activity.DueInHours is > 0 ? config.Activity.DueInHours : null));
    }

    private static string? NormalizeOptional(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }
}
