namespace Backend.Models;

public class Profile
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string About { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string LinkedInUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
}
