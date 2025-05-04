using CRMSolution.Grpc.Tasks;

namespace ApiGateway.DTO.Responses;

public class GetAllTasksResponse
{
    public List<TaskDto> Tasks { get; set; }
}

public class TaskDto
{
    public int TaskId { get; set; }
    public int OrderId { get; set; }
    public string Title { get; set; }
    public TasksStatus Status { get; set; }
    public DateTime DueDate { get; set; }
    public string Username { get; set; }
}