using CRMSolution.Data.Models;

namespace ControllerFirst.DTO.Responses.User;

public class FindUserReponse
{
    public FindUserClientsResponse[]? clients { get; set; }
    public FindUserOrdersResponse[]? orders { get; set; }
    public FindUserTasksResponse[]? tasks { get; set; }
}

public class FindUserOrdersResponse
{
    public string orderId { get; set; }
    public OrderStatus status { get; set; }
}

public class FindUserTasksResponse
{
    public string taskId { get; set; }
    public TaskStatus status { get; set; }
}

public class FindUserClientsResponse
{
    public string clientName { get; set; }
}