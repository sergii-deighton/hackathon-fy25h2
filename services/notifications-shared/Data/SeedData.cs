using Notifications.Shared.Entities;
using Notifications.Shared.Messages;

namespace Notifications.Shared.Data;

public static class SeedData
{
    public static async Task EnsureSeededAsync(NotificationDbContext db, CancellationToken cancellationToken = default)
    {
        if (!db.Notifications.Any())
        {
            db.Notifications.AddRange(new[]
            {
                new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = "alice",
                    Type = "info",
                    Status = "read",
                    Source = "ReleaseService",
                    Title = "Welcome to the hackathon!",
                    Body = "Kick off the demo by reviewing the notification architecture.",
                    CreatedAt = DateTime.UtcNow.AddMinutes(-30),
                    ReadAt = DateTime.UtcNow.AddMinutes(-20),
                    Link = "#"
                },
                new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = "bob",
                    Type = "error",
                    Status = "unread",
                    Source = "CI/CD",
                    Title = "Deploy failed on mobile pipeline.",
                    Body = "Action required: investigate the Android build logs.",
                    CreatedAt = DateTime.UtcNow.AddMinutes(-20)
                },
                new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = "ops",
                    Type = "warning",
                    Status = "unread",
                    Source = "Ops",
                    Title = "Latency increased on EU region.",
                    Body = "EU users may see slower responses. Monitoring in progress.",
                    CreatedAt = DateTime.UtcNow.AddMinutes(-10),
                    Link = "#"
                }
            });
        }

        if (!db.NotificationChannelPreferences.Any())
        {
            db.NotificationChannelPreferences.AddRange(new[]
            {
                new NotificationChannelPreference
                {
                    Id = Guid.NewGuid(),
                    UserId = "alice",
                    EmailEnabled = true,
                    SmsEnabled = false,
                    InAppEnabled = true
                },
                new NotificationChannelPreference
                {
                    Id = Guid.NewGuid(),
                    UserId = "bob",
                    EmailEnabled = true,
                    SmsEnabled = true,
                    InAppEnabled = true
                }
            });
        }

        await db.SaveChangesAsync(cancellationToken);
    }
}
