namespace Notifications.Shared.Messages;

public record SendNotificationCommand(
    string? UserId,
    string? GroupId,
    bool Broadcast,
    string Type,
    string Title,
    string Body,
    string? Link,
    string Source
);
