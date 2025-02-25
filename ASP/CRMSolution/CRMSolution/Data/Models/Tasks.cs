namespace CRMSolution.Data.Models;

public class Tasks
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskStatus Status { get; set; } = TaskStatus.New;
    public DateTime DueDate { get; set; }

    public Guid ClientId { get; set; }
    public Client Client { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; }
    public Guid AssignedToId { get; set; }
    public User AssignedTo { get; set; }
}

public enum TaskStatus
{
    New,
    InProgress,
    Completed
}