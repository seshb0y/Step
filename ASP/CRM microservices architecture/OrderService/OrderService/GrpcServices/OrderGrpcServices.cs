// using Grpc.Core;
// using CRMSolution.Grpc.Orders;
// using CRMSolution.Services.Interfaces;
// using OrderService.DTO.Requests.Order;
// using OrderService.Services.Interfaces;
//
// namespace OrderService.GrpcServices;
//
// public class OrderGrpcService : OrderService.OrderServiceBase
// {
//     private readonly IOrderService _orderService;
//
//     public OrderGrpcService(IOrderService orderService)
//     {
//         _orderService = orderService;
//     }
//
//     public override async Task<OrderDto> GetOrderById(GetOrderByIdRequest request, ServerCallContext context)
//     {
//         var order = await _orderService.GetByIdAsync(request.OrderId);
//
//         return new OrderDto
//         {
//             Id = order.Id.ToString(),
//             TotalAmount = (double)order.TotalAmount,
//             Status = order.Status.ToString(),
//             UserId = order.UserId,
//             ClientId = order.ClientId
//         };
//     }
// }