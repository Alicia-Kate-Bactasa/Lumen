using Lumen.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Lumen.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(product => product.Name).HasMaxLength(120);
            entity.Property(product => product.Slug).HasMaxLength(160);
            entity.Property(product => product.ImageUrl).HasMaxLength(400);
            entity.Property(product => product.Price).HasPrecision(18, 2);
            entity.Property(product => product.Category).HasMaxLength(40);
            entity.Property(product => product.CaffeineLevel).HasMaxLength(20);
            entity.Property(product => product.TasteNotes).HasMaxLength(500);
            entity.Property(product => product.BrewingTip).HasMaxLength(500);
            entity.Property(product => product.CreatedAtUtc).HasDefaultValueSql("SYSUTCDATETIME()");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(user => user.Name).HasMaxLength(100).IsRequired();
            entity.Property(user => user.Email).HasMaxLength(256).IsRequired();
            entity.HasIndex(user => user.Email).IsUnique();
            entity.Property(user => user.PasswordHash).HasMaxLength(256).IsRequired();
            entity.Property(user => user.PasswordSalt).HasMaxLength(256).IsRequired();
            entity.Property(user => user.CreatedAtUtc).HasDefaultValueSql("SYSUTCDATETIME()");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(order => order.TotalAmount).HasPrecision(18, 2);
            entity.Property(order => order.Status).HasMaxLength(50).IsRequired();
            entity.Property(order => order.ShippingAddress).HasMaxLength(500).IsRequired();
            entity.Property(order => order.CreatedAtUtc).HasDefaultValueSql("SYSUTCDATETIME()");

            entity.HasOne(order => order.User)
                .WithMany(user => user.Orders)
                .HasForeignKey(order => order.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.Property(item => item.ProductName).HasMaxLength(120).IsRequired();
            entity.Property(item => item.Price).HasPrecision(18, 2);

            entity.HasOne(item => item.Order)
                .WithMany(order => order.Items)
                .HasForeignKey(item => item.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
