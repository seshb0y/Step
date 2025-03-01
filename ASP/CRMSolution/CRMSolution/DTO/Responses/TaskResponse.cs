namespace ControllerFirst.DTO.Responses;


public class TaskResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public OrderResponse Order { get; set; }
    public List<UserTaskResponse> UserTasks { get; set; }
}


public class UserTaskResponse
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserName { get; set; } 
    public string Email { get; set; } = string.Empty;
    public bool IsEmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}