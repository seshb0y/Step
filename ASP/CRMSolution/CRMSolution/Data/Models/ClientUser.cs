namespace CRMSolution.Data.Models;

public class ClientUser
{
    public int ClientId { get; set; }
    public Client Client { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}