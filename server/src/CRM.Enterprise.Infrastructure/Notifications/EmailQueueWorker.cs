using System.Text.Json;
using Azure.Messaging.ServiceBus;
using CRM.Enterprise.Infrastructure;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Notifications;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class EmailQueueWorker : BackgroundService
{
    private readonly ServiceBusProcessor? _processor;
    private readonly AcsEmailSender _sender;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<EmailQueueWorker> _logger;
    private readonly ICrmRealtimePublisher _realtimePublisher;

    public EmailQueueWorker(
        ServiceBusClientProvider clientProvider,
        IOptions<AcsEmailOptions> options,
        AcsEmailSender sender,
        IServiceScopeFactory scopeFactory,
        ILogger<EmailQueueWorker> logger,
        ICrmRealtimePublisher realtimePublisher)
    {
        _sender = sender;
        _scopeFactory = scopeFactory;
        _logger = logger;
        _realtimePublisher = realtimePublisher;

        var queueName = options.Value?.QueueName ?? "email-outbox";
        _processor = clientProvider.Client?.CreateProcessor(queueName, new ServiceBusProcessorOptions
        {
            AutoCompleteMessages = false,
            MaxConcurrentCalls = 2
        });
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (_processor is null)
        {
            _logger.LogInformation("EmailQueueWorker disabled: Service Bus client is not configured.");
            return;
        }

        _processor.ProcessMessageAsync += HandleMessageAsync;
        _processor.ProcessErrorAsync += HandleErrorAsync;

        try
        {
            await _processor.StartProcessingAsync(stoppingToken);

            // Keep the worker alive until shutdown. Task.Delay throws on cancellation; swallow that on stop.
            await Task.Delay(Timeout.InfiniteTimeSpan, stoppingToken);
        }
        catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
        {
            // Expected during shutdown.
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "EmailQueueWorker crashed.");
            throw;
        }
    }

    private async Task HandleMessageAsync(ProcessMessageEventArgs args)
    {
        try
        {
            var payload = JsonSerializer.Deserialize<EmailQueueMessage>(args.Message.Body.ToString());
            if (payload is null)
            {
                await args.DeadLetterMessageAsync(args.Message, cancellationToken: args.CancellationToken);
                return;
            }

            var result = await ProcessPayloadAsync(payload, args.CancellationToken);
            await PublishDeliveryStatusAsync(payload, result.Status, result.Error, args.CancellationToken);
            await args.CompleteMessageAsync(args.Message, args.CancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process email queue message.");
            try
            {
                var payload = JsonSerializer.Deserialize<EmailQueueMessage>(args.Message.Body.ToString());
                if (payload is not null)
                {
                    await PublishDeliveryStatusAsync(payload, "failed", ex.Message, args.CancellationToken);
                }
            }
            catch
            {
                // Best-effort realtime status publish.
            }
            await args.AbandonMessageAsync(args.Message, cancellationToken: args.CancellationToken);
        }
    }

    private Task HandleErrorAsync(ProcessErrorEventArgs args)
    {
        _logger.LogError(args.Exception, "Service Bus processor error.");
        return Task.CompletedTask;
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        if (_processor is not null)
        {
            await _processor.StopProcessingAsync(cancellationToken);
            await _processor.DisposeAsync();
        }

        await base.StopAsync(cancellationToken);
    }

    internal async Task<EmailQueueProcessResult> ProcessPayloadAsync(EmailQueueMessage payload, CancellationToken cancellationToken)
    {
        if (payload.TenantId.HasValue && payload.TenantId.Value != Guid.Empty && payload.Category.HasValue)
        {
            using var scope = _scopeFactory.CreateScope();
            var policy = scope.ServiceProvider.GetRequiredService<IWorkspaceEmailDeliveryPolicy>();
            var allowed = await policy.IsEnabledAsync(payload.TenantId.Value, payload.Category.Value, cancellationToken);
            if (!allowed)
            {
                _logger.LogInformation(
                    "Queued email delivery suppressed for tenant {TenantId} category {Category}.",
                    payload.TenantId.Value,
                    payload.Category.Value);
                return new EmailQueueProcessResult("suppressed", "Email delivery is disabled in workspace settings.");
            }
        }

        await _sender.SendAsync(
            payload.ToEmail,
            payload.Subject,
            payload.HtmlBody,
            payload.TextBody,
            payload.Category,
            cancellationToken);
        return new EmailQueueProcessResult("sent", null);
    }

    private async Task PublishDeliveryStatusAsync(
        EmailQueueMessage payload,
        string status,
        string? error,
        CancellationToken cancellationToken)
    {
        if (!payload.TenantId.HasValue || payload.TenantId == Guid.Empty)
        {
            return;
        }

        var eventPayload = new
        {
            toEmail = payload.ToEmail,
            subject = payload.Subject,
            status,
            error,
            processedAtUtc = DateTime.UtcNow
        };

        await _realtimePublisher.PublishTenantEventAsync(
            payload.TenantId.Value,
            "email.delivery.status",
            eventPayload,
            cancellationToken);

        if (payload.RequestedByUserId.HasValue && payload.RequestedByUserId.Value != Guid.Empty)
        {
            await _realtimePublisher.PublishUserEventAsync(
                payload.TenantId.Value,
                payload.RequestedByUserId.Value,
                "email.delivery.status",
                eventPayload,
                cancellationToken);
        }
    }
}

internal sealed record EmailQueueProcessResult(string Status, string? Error);
