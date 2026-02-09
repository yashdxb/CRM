using Azure.Messaging.ServiceBus;

namespace CRM.Enterprise.Infrastructure;

public sealed class ServiceBusClientProvider
{
    public ServiceBusClient? Client { get; }

    public ServiceBusClientProvider(ServiceBusClient? client)
    {
        Client = client;
    }
}
