namespace Notifications.Shared.Entities;

public class Notification
{
    public Guid Id { get; set; }
    public string? UserId { get; set; } // null for broadcast
    public string Type { get; set; } = "info"; // info, warning, error, etc.
    public string Status { get; set; } = "unread"; // unread / read
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReadAt { get; set; }
    public string Source { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string? Link { get; set; }
}
