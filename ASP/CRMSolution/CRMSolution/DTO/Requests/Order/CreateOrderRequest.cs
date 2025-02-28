namespace CRMSolution.DTO.Requests;

public record CreateOrderRequest(decimal totalAmount, string clientEmail);