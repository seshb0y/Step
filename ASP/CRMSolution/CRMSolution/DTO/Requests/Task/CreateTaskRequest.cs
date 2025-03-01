using CRMSolution.Services.Interfaces;

namespace CRMSolution.DTO.Requests.Task;

public record CreateTaskRequest(string title, string description, DateTime endDate, string userEmail, Guid orderId);