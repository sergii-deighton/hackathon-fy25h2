using Microsoft.EntityFrameworkCore;
using Notifications.Shared.Data;
using Notifications.Shared.Entities;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Postgres") ??
                       "Host=postgres;Port=5432;Database=notifications;Username=postgres;Password=postgres";

builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(NotificationDbContext).Assembly.FullName)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Apply migrations and seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NotificationDbContext>();
    await db.Database.MigrateAsync();
    await SeedData.EnsureSeededAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapGet("/api/notifications", async (NotificationDbContext db) =>
{
    var items = await db.Notifications.AsNoTracking().OrderByDescending(n => n.CreatedAt).ToListAsync();
    return Results.Ok(items);
});

app.MapPost("/api/notifications", async (NotificationDbContext db, Notification notification) =>
{
    notification.Id = Guid.NewGuid();
    notification.CreatedAt = DateTime.UtcNow;
    db.Notifications.Add(notification);
    await db.SaveChangesAsync();
    return Results.Created($"/api/notifications/{notification.Id}", notification);
});

app.MapPost("/api/notifications/{id:guid}/read", async (NotificationDbContext db, Guid id) =>
{
    var item = await db.Notifications.FindAsync(id);
    if (item == null) return Results.NotFound();
    item.Status = "read";
    item.ReadAt = DateTime.UtcNow;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/api/notifications/{id:guid}", async (NotificationDbContext db, Guid id) =>
{
    var item = await db.Notifications.FindAsync(id);
    if (item == null) return Results.NotFound();
    db.Notifications.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
