using ApiGateway.DTO.Requests;
using ApiGateway.DTO.Requests.Order;
using ApiGateway.DTO.Requests.Orders;
using ApiGateway.DTO.Responses;
using AutoMapper;
using CRMSolution.DTO.Requests;
using CRMSolution.Grpc.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HttpChangeOrderDataRequest = CRMSolution.Grpc.Orders.ChangeOrderDataRequest;
using HttpDeleteOrderRequest = CRMSolution.Grpc.Orders.DeleteOrderRequest;

namespace ApiGateway.Controllers;

[ApiController]
[Route("api/v1/orders/")]
public class OrderController : ControllerBase
{
    private readonly OrderGrpcService.OrderGrpcServiceClient _orderGrpcService;
    private readonly IMapper _mapper;

    public OrderController(OrderGrpcService.OrderGrpcServiceClient orderGrpcService,  IMapper mapper)
    {
        _orderGrpcService = orderGrpcService;
        _mapper = mapper;
    }


    [HttpPost]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddOrder([FromBody] HttpCreateOrderRequest request)
    {
        var grpcRequest = new CreateOrderRequest
        {
            UserEmail = request.userEmail,
            ClientEmail = request.clientEmail,
            TotalAmount = (double)request.totalAmount,
        };
        var grpcResponse = await _orderGrpcService.CreateOrderAsync(grpcRequest);
        
        return Ok(grpcResponse);
    }
    
    [HttpPut]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeOrder([FromBody] HttpChangeOrderDataRequest request)
    {
        var grpcRequest = new ChangeOrderDataRequest
        {
            OrderId = request.OrderId,
            TotalAmount = (double)request.TotalAmount,
            Status = (OrderStatus)request.Status,
        };
        var grpcResponse = await _orderGrpcService.ChangeOrderDataAsync(grpcRequest);
        
        return Ok(grpcResponse);
    }
    
    [HttpDelete]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteOrder([FromBody] HttpDeleteOrderRequest request)
    {
        var grpcRequest = new DeleteOrderRequest
        {
            OrderId = request.OrderId
        };
        var grpcResponse = await _orderGrpcService.DeleteOrderAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    // [HttpGet("find/order")]
    // // [Authorize(Policy = "ManagerPolicy")]
    // public async Task<IActionResult> FindOrder([FromQuery] FindOrderRequest request)
    // {
    //     return Ok(await _orderService.FindOrder(request));
    // }
    
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetOrderDetails(int orderId)
    {
        var grpcRequest = new GetOrderFullInfoRequest
        {
            OrderId = orderId
        };
        var grpcResponse = _orderGrpcService.GetOrderFullInfo(grpcRequest);
        var response = _mapper.Map<OrderDetailsResponse>(grpcResponse);

        return Ok(response);
    }
    
    [HttpPut("{orderId}/user")]
    public async Task<IActionResult> ChangeResponsible(int orderId, ChangeResponsibleRequest request)
    {
        // await _orderService.ChangeResponsible(orderId, request);
        return Ok("Responsible changed");
    }
    
    
    
    [HttpGet]
    public async Task<IActionResult> GetAllOrders([FromQuery] SortOrdersRequest sortOrdersRequest)
    {
        // var orders = await _orderService.GetAllOrders(sortOrdersRequest);
        return Ok("orders");
    }
    
    // [HttpGet("load/data")]
    // // [Authorize(Policy = "ManagerPolicy")]
    // public async Task<IActionResult> LoadClientData([FromQuery] FindOrderRequest request)
    // {
    //     return Ok(await _orderService.FindOrder(request));
    // }
}