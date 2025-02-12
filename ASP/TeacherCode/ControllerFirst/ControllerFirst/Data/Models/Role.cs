
namespace ControllerFirst.Models;

public class Role
{
    public Guid RoleId { get; set; } = Guid.NewGuid();
    public string RoleName { get; set; }

    public ICollection<UserRole> UserRoles { get; set; }
}