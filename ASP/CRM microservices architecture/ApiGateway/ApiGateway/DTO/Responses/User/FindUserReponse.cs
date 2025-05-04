using CRMSolution.Data.Models;

namespace ApiGateway.DTO.Responses.User;

public class FindUserReponse
{
    public FindUserClientsResponse[]? clients { get; set; }
    public FindUserOrdersResponse[]? orders { get; set; }
    public FindUserTasksResponse[]? tasks { get; set; }
}

public class FindUserOrdersResponse
{
    public string orderId { get; set; }
    public decimal totalAmount { get; set; }
    public string status { get; set; }
}

public class FindUserTasksResponse
{
    public string taskId { get; set; }
    public string  title { get; set; }
    public string status { get; set; }
}

public class FindUserClientsResponse
{
    public string clientName { get; set; }
}