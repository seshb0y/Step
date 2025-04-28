namespace TaskService.DTO.Requests.Task;

public class SortTasksRequest
{
    public string? sortBy { get; set; } 
    public bool Descending { get; set; } = false; 
}