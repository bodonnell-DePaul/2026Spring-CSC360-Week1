namespace Backend.Models;

public class ProjectItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string RepositoryUrl { get; set; } = string.Empty;
}
