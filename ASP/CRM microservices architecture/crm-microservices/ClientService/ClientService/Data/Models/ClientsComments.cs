namespace ClientService.Data.Models;

public class ClientsComments
{
    public  int Id { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int UserId { get; set; }
    public int ClientId { get; set; }
}