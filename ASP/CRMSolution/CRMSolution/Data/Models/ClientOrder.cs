namespace CRMSolution.Data.Models;

public class ClientOrder
{
    public Guid ClientId { get; set; }
    public Client Client { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; }
}