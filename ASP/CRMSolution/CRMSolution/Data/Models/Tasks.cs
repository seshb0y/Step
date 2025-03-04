namespace CRMSolution.Data.Models;

public class Tasks
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TasksStatus Status { get; set; } = TasksStatus.New;
    public DateTime DueDate { get; set; }

    // public Guid ClientId { get; set; }
    // public Client Client { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; }
    
    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}

public enum TasksStatus
{
    New,
    InProgress,
    Completed
}