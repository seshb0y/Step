namespace CRMSolution.Data.Models;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.New;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid ClientId { get; set; }
    public Client Client { get; set; }
    
    public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
}

public enum OrderStatus
{
    New,
    Processing,
    Completed
}