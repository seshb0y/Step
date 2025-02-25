using CRMSolution.Services.Interfaces;

namespace CRMSolution.DTO.Requests.Task;

public record CreateTaskRequest(string title, string description, DateTime endDate, string clientId, string userId, string orderId);