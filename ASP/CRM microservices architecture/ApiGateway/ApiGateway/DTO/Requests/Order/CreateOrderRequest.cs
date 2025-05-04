namespace ApiGateway.DTO.Requests;

public record CreateOrderRequest(decimal totalAmount, string clientEmail, string userEmail);