namespace ApiGateway.DTO.Responses;

public class HttpGetClientCommentsResponse
{
    public IList<Comments> comments { get; set; }
}

public class Comments
{
    public int ClientId { get; set; }
    public string Comment { get; set; }
    public int UserId { get; set; }
    public DateTime CreatedAt { get; set; }
}