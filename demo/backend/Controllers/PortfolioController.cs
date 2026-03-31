using Backend.Contracts.Portfolio;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController(AppDbContext db) : ControllerBase
{
    [HttpGet("profile")]
    public async Task<ActionResult<Profile>> GetProfile()
    {
        var profile = await db.Profiles.FirstOrDefaultAsync();
        if (profile is null)
        {
            return NotFound(new { message = "Profile not found." });
        }

        return Ok(profile);
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<ActionResult<Profile>> UpsertProfile(ProfileRequest request)
    {
        var profile = await db.Profiles.FirstOrDefaultAsync();
        if (profile is null)
        {
            profile = new Profile();
            db.Profiles.Add(profile);
        }

        profile.FullName = request.FullName;
        profile.Headline = request.Headline;
        profile.About = request.About;
        profile.Email = request.Email;
        profile.LinkedInUrl = request.LinkedInUrl;
        profile.GitHubUrl = request.GitHubUrl;

        await db.SaveChangesAsync();
        return Ok(profile);
    }

    [HttpGet("projects")]
    public async Task<ActionResult<IEnumerable<ProjectItem>>> GetProjects()
    {
        var projects = await db.Projects.OrderBy(p => p.Id).ToListAsync();
        return Ok(projects);
    }

    [Authorize]
    [HttpPost("projects")]
    public async Task<ActionResult<ProjectItem>> CreateProject(ProjectRequest request)
    {
        var project = new ProjectItem
        {
            Title = request.Title,
            Description = request.Description,
            TechStack = request.TechStack,
            ProjectUrl = request.ProjectUrl,
            RepositoryUrl = request.RepositoryUrl
        };

        db.Projects.Add(project);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
    }

    [Authorize]
    [HttpPut("projects/{id:int}")]
    public async Task<ActionResult<ProjectItem>> UpdateProject(int id, ProjectRequest request)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        project.Title = request.Title;
        project.Description = request.Description;
        project.TechStack = request.TechStack;
        project.ProjectUrl = request.ProjectUrl;
        project.RepositoryUrl = request.RepositoryUrl;

        await db.SaveChangesAsync();
        return Ok(project);
    }

    [Authorize]
    [HttpDelete("projects/{id:int}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null)
        {
            return NotFound(new { message = "Project not found." });
        }

        db.Projects.Remove(project);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("contact")]
    public async Task<IActionResult> SubmitContact(ContactRequest request)
    {
        var entry = new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Message = request.Message
        };

        db.ContactMessages.Add(entry);
        await db.SaveChangesAsync();

        return Accepted(new { message = "Message submitted successfully." });
    }
}
