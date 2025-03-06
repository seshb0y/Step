namespace CRMSolution.DTO.Requests.Client;

public class SortClientsRequest
{
    public string? sortBy { get; set; } 
    public bool Descending { get; set; } = false; 
}