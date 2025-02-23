namespace CRMSolution.Data.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Manager;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Client> Clients { get; set; } = new List<Client>();
    public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
}

public enum UserRole
{
    Admin,
    Manager
}