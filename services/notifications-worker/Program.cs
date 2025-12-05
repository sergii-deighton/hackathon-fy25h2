using MassTransit;
using Microsoft.EntityFrameworkCore;
using Notifications.Shared.Data;
using Notifications.Shared.Messages;
using Notifications.Shared.Entities;

var builder = Host.CreateApplicationBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Postgres") ??
                       "Host=postgres;Port=5432;Database=notifications;Username=postgres;Password=postgres";

builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(NotificationDbContext).Assembly.FullName)));

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<SendNotificationConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        var rabbitHost = builder.Configuration["RabbitMq:Host"] ?? "rabbitmq";
        var rabbitUser = builder.Configuration["RabbitMq:Username"] ?? "guest";
        var rabbitPass = builder.Configuration["RabbitMq:Password"] ?? "guest";
        cfg.Host(rabbitHost, "/", h =>
        {
            h.Username(rabbitUser);
            h.Password(rabbitPass);
        });

        cfg.ReceiveEndpoint("send-notification-queue", e =>
        {
            e.ConfigureConsumer<SendNotificationConsumer>(context);
        });
    });
});

builder.Services.AddHostedService<WorkerStartup>();

var host = builder.Build();
await host.RunAsync();

public class WorkerStartup : IHostedService
{
    private readonly IServiceProvider _provider;

    public WorkerStartup(IServiceProvider provider)
    {
        _provider = provider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _provider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<NotificationDbContext>();
        await db.Database.MigrateAsync(cancellationToken);
        await SeedData.EnsureSeededAsync(db, cancellationToken);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}

public class SendNotificationConsumer : IConsumer<SendNotificationCommand>
{
    private readonly NotificationDbContext _db;

    public SendNotificationConsumer(NotificationDbContext db)
    {
        _db = db;
    }

    public async Task Consume(ConsumeContext<SendNotificationCommand> context)
    {
        var msg = context.Message;
        var notification = new Notification
        {
            Id = Guid.NewGuid(),
            UserId = msg.UserId,
            Type = msg.Type,
            Status = "unread",
            Source = msg.Source,
            Title = msg.Title,
            Body = msg.Body,
            Link = msg.Link,
            CreatedAt = DateTime.UtcNow
        };

        _db.Notifications.Add(notification);
        await _db.SaveChangesAsync(context.CancellationToken);

        // TODO: send email/SMS based on preferences
    }
}
