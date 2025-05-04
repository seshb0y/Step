using ApiGateway.Services.Interfaces;

namespace CRMSolution.DTO.Requests.Task;

public record CreateTaskRequest(string title, string description, DateTime endDate, string userName, int orderId);