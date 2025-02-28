namespace CRMSolution.DTO.Requests;

public record ChangeOrderDataRequest(decimal totalAmount, Guid orderId);