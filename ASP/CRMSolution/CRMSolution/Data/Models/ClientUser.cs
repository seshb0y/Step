namespace CRMSolution.Data.Models;

public class ClientUser
{
    public Guid ClientId { get; set; }
    public Client Client { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }
}