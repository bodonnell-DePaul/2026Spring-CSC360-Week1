using System.ComponentModel.DataAnnotations;

namespace Backend.Contracts.Portfolio;

public class ProfileRequest
{
    [Required, MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string Headline { get; set; } = string.Empty;

    [Required]
    public string About { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string LinkedInUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
}
