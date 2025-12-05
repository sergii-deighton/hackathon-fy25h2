namespace Notifications.Shared.Entities;

public class NotificationChannelPreference
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public bool EmailEnabled { get; set; }
    public bool SmsEnabled { get; set; }
    public bool InAppEnabled { get; set; } = true;
}
