using Lumen.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Lumen.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(product => product.Name).HasMaxLength(120);
            entity.Property(product => product.Slug).HasMaxLength(160);
            entity.Property(product => product.ImageUrl).HasMaxLength(400);
            entity.Property(product => product.Price).HasPrecision(18, 2);
            entity.Property(product => product.CreatedAtUtc).HasDefaultValueSql("SYSUTCDATETIME()");
        });
    }
}