using System.Text.Json;
using Azure.Messaging.ServiceBus;
using CRM.Enterprise.Infrastructure;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class EmailQueueWorker : BackgroundService
{
    private readonly ServiceBusProcessor? _processor;
    private readonly AcsEmailSender _sender;
    private readonly ILogger<EmailQueueWorker> _logger;

    public EmailQueueWorker(ServiceBusClientProvider clientProvider, IOptions<AcsEmailOptions> options, AcsEmailSender sender, ILogger<EmailQueueWorker> logger)
    {
        _sender = sender;
        _logger = logger;

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

            // Send the email from the background worker to avoid blocking API requests.
            await _sender.SendAsync(payload.ToEmail, payload.Subject, payload.HtmlBody, payload.TextBody, args.CancellationToken);
            await args.CompleteMessageAsync(args.Message, args.CancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process email queue message.");
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
}
