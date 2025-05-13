namespace ApiGateway.DTO.Requests.Task;

public record HttpUpdateTaskRequest(TaskStatus status, string description, int taskId);