using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Notifications.Shared.Data;
using Notifications.Shared.Entities;

namespace Notifications.Shared.Data.Migrations;

[DbContext(typeof(NotificationDbContext))]
partial class NotificationDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.10")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        modelBuilder.Entity("Notifications.Shared.Entities.Notification", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<string>("Body")
                .IsRequired()
                .HasColumnType("text");

            b.Property<DateTime>("CreatedAt")
                .HasColumnType("timestamp with time zone");

            b.Property<string>("Link")
                .HasColumnType("text");

            b.Property<DateTime?>("ReadAt")
                .HasColumnType("timestamp with time zone");

            b.Property<string>("Source")
                .IsRequired()
                .HasMaxLength(64)
                .HasColumnType("character varying(64)");

            b.Property<string>("Status")
                .IsRequired()
                .HasMaxLength(16)
                .HasColumnType("character varying(16)");

            b.Property<string>("Title")
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.Property<string>("Type")
                .IsRequired()
                .HasMaxLength(32)
                .HasColumnType("character varying(32)");

            b.Property<string>("UserId")
                .HasColumnType("text");

            b.HasKey("Id");

            b.ToTable("Notifications");
        });

        modelBuilder.Entity("Notifications.Shared.Entities.NotificationChannelPreference", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<bool>("EmailEnabled")
                .HasColumnType("boolean");

            b.Property<bool>("InAppEnabled")
                .HasColumnType("boolean");

            b.Property<bool>("SmsEnabled")
                .HasColumnType("boolean");

            b.Property<string>("UserId")
                .IsRequired()
                .HasMaxLength(64)
                .HasColumnType("character varying(64)");

            b.HasKey("Id");

            b.HasIndex("UserId")
                .IsUnique();

            b.ToTable("NotificationChannelPreferences");
        });
#pragma warning restore 612, 618
    }
}
