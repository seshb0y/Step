namespace ApiGateway.DTO.Requests;

public class SortUsersRequest
{
    public string? sortBy { get; set; } 
    public bool Descending { get; set; } = false; 
}