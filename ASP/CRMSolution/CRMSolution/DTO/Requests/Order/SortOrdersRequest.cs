namespace CRMSolution.DTO.Requests.Orders;

public class SortOrdersRequest
{
    public string? sortBy { get; set; } 
    public bool Descending { get; set; } = false; 
}