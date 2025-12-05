using Microsoft.EntityFrameworkCore;
using Notifications.Shared.Entities;

namespace Notifications.Shared.Data;

public class NotificationDbContext : DbContext
{
    public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options) { }

    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<NotificationChannelPreference> NotificationChannelPreferences => Set<NotificationChannelPreference>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(n => n.Id);
            entity.Property(n => n.Type).HasMaxLength(32);
            entity.Property(n => n.Status).HasMaxLength(16);
            entity.Property(n => n.Source).HasMaxLength(64);
            entity.Property(n => n.Title).HasMaxLength(256);
        });

        modelBuilder.Entity<NotificationChannelPreference>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.UserId).HasMaxLength(64);
            entity.HasIndex(p => p.UserId).IsUnique();
        });
    }
}
