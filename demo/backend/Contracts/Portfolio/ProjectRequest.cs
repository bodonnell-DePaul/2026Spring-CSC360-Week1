using System.ComponentModel.DataAnnotations;

namespace Backend.Contracts.Portfolio;

public class ProjectRequest
{
    [Required, MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string TechStack { get; set; } = string.Empty;

    public string ProjectUrl { get; set; } = string.Empty;
    public string RepositoryUrl { get; set; } = string.Empty;
}
