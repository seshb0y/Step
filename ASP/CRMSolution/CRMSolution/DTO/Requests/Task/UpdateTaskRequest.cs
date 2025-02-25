namespace CRMSolution.DTO.Requests.Task;

public record UpdateTaskRequest(string status, string description, string taskId);