using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Infrastructure;
using CRM.Enterprise.Infrastructure.Notifications;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Notifications;

public class EmailQueueWorkerTests
{
    [Fact]
    public async Task ProcessPayloadAsync_Suppresses_WhenTenantCategoryDisabled()
    {
        var sender = new FakeEmailSender();
        var worker = CreateWorker(new StubWorkspaceEmailDeliveryPolicy(false), sender);

        var result = await worker.ProcessPayloadAsync(
            new EmailQueueMessage(
                "user@example.com",
                "Invite",
                "<p>Invite</p>",
                "Invite",
                Guid.NewGuid(),
                Guid.NewGuid(),
                WorkspaceEmailDeliveryCategory.Invites),
            CancellationToken.None);

        Assert.Equal("suppressed", result.Status);
        Assert.Equal(0, sender.SendCount);
    }

    [Fact]
    public async Task ProcessPayloadAsync_Sends_WhenTenantCategoryEnabled()
    {
        var sender = new FakeEmailSender();
        var worker = CreateWorker(new StubWorkspaceEmailDeliveryPolicy(true), sender);

        var result = await worker.ProcessPayloadAsync(
            new EmailQueueMessage(
                "user@example.com",
                "Invite",
                "<p>Invite</p>",
                "Invite",
                Guid.NewGuid(),
                Guid.NewGuid(),
                WorkspaceEmailDeliveryCategory.Invites),
            CancellationToken.None);

        Assert.Equal("sent", result.Status);
        Assert.Equal(1, sender.SendCount);
        Assert.Equal(WorkspaceEmailDeliveryCategory.Invites, sender.LastCategory);
    }

    private static EmailQueueWorker CreateWorker(IWorkspaceEmailDeliveryPolicy policy, FakeEmailSender sender)
    {
        var services = new ServiceCollection();
        services.AddSingleton(policy);
        var provider = services.BuildServiceProvider();

        return new EmailQueueWorker(
            new ServiceBusClientProvider(null),
            Options.Create(new AcsEmailOptions()),
            sender,
            provider.GetRequiredService<IServiceScopeFactory>(),
            NullLogger<EmailQueueWorker>.Instance,
            new FakeRealtimePublisher());
    }

    private sealed class StubWorkspaceEmailDeliveryPolicy : IWorkspaceEmailDeliveryPolicy
    {
        private readonly bool _enabled;

        public StubWorkspaceEmailDeliveryPolicy(bool enabled)
        {
            _enabled = enabled;
        }

        public Task<bool> IsEnabledAsync(WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default)
            => Task.FromResult(_enabled);

        public Task<bool> IsEnabledAsync(Guid tenantId, WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default)
            => Task.FromResult(_enabled);

        public Task<bool> IsStatusNotificationsEnabledAsync(Guid tenantId, CancellationToken cancellationToken = default)
            => Task.FromResult(_enabled);
    }

    private sealed class FakeEmailSender : AcsEmailSender
    {
        public int SendCount { get; private set; }
        public WorkspaceEmailDeliveryCategory? LastCategory { get; private set; }

        public FakeEmailSender() : base(Options.Create(new AcsEmailOptions
        {
            Enabled = true,
            ConnectionString = "endpoint=https://example.communication.azure.com/;accesskey=fake",
            SenderEmail = "no-reply@example.com"
        }))
        {
        }

        public override Task SendAsync(
            string toEmail,
            string subject,
            string htmlBody,
            string? textBody = null,
            WorkspaceEmailDeliveryCategory? category = null,
            CancellationToken cancellationToken = default)
        {
            SendCount++;
            LastCategory = category;
            return Task.CompletedTask;
        }
    }

    private sealed class FakeRealtimePublisher : ICrmRealtimePublisher
    {
        public Task PublishTenantEventAsync(Guid tenantId, string eventType, object payload, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task PublishUserEventAsync(Guid tenantId, Guid userId, string eventType, object payload, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task PublishUsersEventAsync(Guid tenantId, IEnumerable<Guid> userIds, string eventType, object payload, CancellationToken cancellationToken = default) => Task.CompletedTask;
    }
}
