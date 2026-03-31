using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<ProjectItem> Projects => Set<ProjectItem>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Profile>()
            .Property(p => p.FullName)
            .HasMaxLength(120);

        modelBuilder.Entity<ProjectItem>()
            .Property(p => p.Title)
            .HasMaxLength(120);

        modelBuilder.Entity<ContactMessage>()
            .Property(c => c.Email)
            .HasMaxLength(120);
    }
}
