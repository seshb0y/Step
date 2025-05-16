using System.Runtime.InteropServices.JavaScript;
using CRMSolution.Grpc.Orders;
using CRMSolution.Grpc.Users;
using OrderStatus = CRMSolution.Grpc.Users.OrderStatus;
using UserRole = CRMSolution.Grpc.Orders.UserRole;

public class HttpUserResponse
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole UserRole { get; set; }
    public bool IsEmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
}

// public class HttpGetAllUsersResponse
// {
//     public List<GetAllUsersUserResponse> Users { get; set; }
// }
//
// public class GetAllUsersUserResponse
// {
//     public string UserId { get; set; }
//     public string Username { get; set; }
//     public string Email { get; set; }
//     
//     public bool IsEmailConfirmed { get; set; }
//     public UserRole UserRole { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public List<GetAllUsersTasksResponse> Tasks { get; set; }
//     public List<GetAllUsersOrdersResponse> Orders { get; set; }
//     public List<GetAllUsersClientsResponse> Clients { get; set; }
// }
//
// public class GetAllUsersTasksResponse
// {
//     public string TaskId { get; set; }
//     public TaskStatus TaskStatus { get; set; }
// }
//
// public class GetAllUsersOrdersResponse
// {
//     public string OrderId { get; set; }
//     public OrderStatus OrderStatus { get; set; }
// }
//
// public class GetAllUsersClientsResponse
// {
//     public string ClientName { get; set; }
// }