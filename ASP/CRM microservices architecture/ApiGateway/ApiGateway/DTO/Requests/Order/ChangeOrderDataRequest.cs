using CRMSolution.Data.Models;

namespace ApiGateway.DTO.Requests;

public record ChangeOrderDataRequest(decimal totalAmount, OrderStatus status, int orderId);