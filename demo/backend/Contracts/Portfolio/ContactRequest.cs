using System.ComponentModel.DataAnnotations;

namespace Backend.Contracts.Portfolio;

public class ContactRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(5)]
    public string Message { get; set; } = string.Empty;
}
