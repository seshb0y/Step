namespace ControllerFirst.DTO.Responses;

public class ClientOrderDto
{
    public Guid ClientId { get; set; }
    public string ClientName { get; set; }
}

public class OrderResponse
{
    public Guid Id { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public List<ClientOrderDto> ClientOrders { get; set; } = new();
}