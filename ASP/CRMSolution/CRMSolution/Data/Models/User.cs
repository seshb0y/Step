namespace CRMSolution.Data.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserName { get; set; } 
    public string Email { get; set; } = string.Empty;
    public bool IsEmailConfirmed { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Manager;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid RefreshToken { get; set; }
    public DateTime RefreshTokenExpiration { get; set; } = DateTime.Now.AddDays(7);

    public ICollection<Client> Clients { get; set; } = new List<Client>();
    public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
}

public enum UserRole
{
    Admin,
    Manager
}