using Backend.Models;

namespace Backend.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (!db.Profiles.Any())
        {
            db.Profiles.Add(new Profile
            {
                FullName = "Alex Developer",
                Headline = "Full-Stack Developer",
                About = "I build modern web apps with React and .NET.",
                Email = "alex@example.com",
                LinkedInUrl = "https://linkedin.com/in/alexdev",
                GitHubUrl = "https://github.com/alexdev"
            });
        }

        if (!db.Projects.Any())
        {
            db.Projects.AddRange(
                new ProjectItem
                {
                    Title = "Task Tracker",
                    Description = "A Kanban app with drag-and-drop tasks.",
                    TechStack = "React, TypeScript, ASP.NET Core",
                    ProjectUrl = "https://example.com/task-tracker",
                    RepositoryUrl = "https://github.com/example/task-tracker"
                },
                new ProjectItem
                {
                    Title = "Portfolio API",
                    Description = "A secure API for personal site content.",
                    TechStack = ".NET, EF Core, SQLite",
                    ProjectUrl = "https://example.com/portfolio-api",
                    RepositoryUrl = "https://github.com/example/portfolio-api"
                },
                new ProjectItem
                {
                    Title = "Realtime Chat",
                    Description = "A websocket-powered group chat app.",
                    TechStack = "React, SignalR, Azure",
                    ProjectUrl = "https://example.com/chat",
                    RepositoryUrl = "https://github.com/example/chat"
                });
        }

        if (!db.Users.Any())
        {
            db.Users.Add(new User
            {
                Email = "admin@portfolio.local",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!")
            });
        }

        db.SaveChanges();
    }
}
