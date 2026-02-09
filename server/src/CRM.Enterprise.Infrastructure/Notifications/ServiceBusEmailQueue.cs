using System.Text.Json;
using Azure.Messaging.ServiceBus;
using CRM.Enterprise.Infrastructure;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class ServiceBusEmailQueue
{
    private readonly ServiceBusSender? _sender;

    public ServiceBusEmailQueue(ServiceBusClientProvider clientProvider, IOptions<AcsEmailOptions> options)
    {
        var queueName = options.Value?.QueueName ?? "email-outbox";
        _sender = clientProvider.Client?.CreateSender(queueName);
    }

    public async Task EnqueueAsync(EmailQueueMessage payload, CancellationToken cancellationToken)
    {
        if (_sender is null)
        {
            return;
        }

        var body = JsonSerializer.Serialize(payload);
        var message = new ServiceBusMessage(body)
        {
            ContentType = "application/json"
        };

        await _sender.SendMessageAsync(message, cancellationToken);
    }
}
