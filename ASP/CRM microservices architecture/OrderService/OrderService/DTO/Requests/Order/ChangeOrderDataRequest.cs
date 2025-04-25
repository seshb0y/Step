using OrderService.Data.Models;

namespace OrderService.DTO.Requests;

public record ChangeOrderDataRequest(decimal totalAmount, OrderStatus status, int orderId);