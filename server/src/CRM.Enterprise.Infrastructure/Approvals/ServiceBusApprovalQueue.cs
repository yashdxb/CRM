using System.Text.Json;
using Azure.Messaging.ServiceBus;
using CRM.Enterprise.Infrastructure;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Approvals;

public sealed class ServiceBusApprovalQueue
{
    private readonly ServiceBusSender? _sender;
    private readonly ApprovalQueueOptions _options;

    public ServiceBusApprovalQueue(ServiceBusClientProvider clientProvider, IOptions<ApprovalQueueOptions> options)
    {
        _options = options.Value;
        var client = clientProvider.Client;
        if (client is null || !_options.Enabled || string.IsNullOrWhiteSpace(_options.QueueName))
        {
            return;
        }

        _sender = client.CreateSender(_options.QueueName);
    }

    public async Task EnqueueAsync(ApprovalQueueMessage message, CancellationToken cancellationToken = default)
    {
        if (_sender is null)
        {
            return;
        }

        var body = JsonSerializer.Serialize(message);
        var queueMessage = new ServiceBusMessage(body)
        {
            ContentType = "application/json",
            Subject = "OpportunityApprovalRequested"
        };

        await _sender.SendMessageAsync(queueMessage, cancellationToken);
    }
}
