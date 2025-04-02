using CRMSolution.Data.Models;

namespace CRMSolution.DTO.Requests;

public record ChangeOrderDataRequest(decimal totalAmount, OrderStatus status, int orderId);