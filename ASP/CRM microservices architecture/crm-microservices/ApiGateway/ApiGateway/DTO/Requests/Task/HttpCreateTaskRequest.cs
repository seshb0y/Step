namespace CRMSolution.DTO.Requests.Task;

public record HttpCreateTaskRequest(string title, string description, DateTime endDate, int userId, int orderId);