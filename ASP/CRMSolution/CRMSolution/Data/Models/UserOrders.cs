namespace CRMSolution.Data.Models;

public class UserOrders
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; }
}