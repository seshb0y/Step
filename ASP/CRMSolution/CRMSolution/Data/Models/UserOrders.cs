namespace CRMSolution.Data.Models;

public class UserOrders
{
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; }
}