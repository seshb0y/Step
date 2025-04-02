namespace CRMSolution.Data.Models;

public class Client
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ClientUser> ClientUsers { get; set; } = new List<ClientUser>();
    
    public ICollection<ClientOrder> ClientOrders { get; set; } = new List<ClientOrder>();
}