using AutoMapper;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO.Requests.Orders;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }


    [HttpPost("add")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddOrder([FromBody] CreateOrderRequest request)
    {
        await _orderService.CreateOrder(request);
        return Ok("Order created");
    }
    
    [HttpPut("change")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeOrder([FromBody] ChangeOrderDataRequest request)
    {
        await _orderService.ChangeDataOrder(request);
        return Ok("Order changed");
    }
    
    [HttpDelete("delete")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteOrder([FromBody] DeleteOrderRequest request)
    {
        await _orderService.DeleteOrder(request);
        return Ok("Order deleted");
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
        var orderDetails = await _orderService.GetOrderDetailsAsync(orderId);

        return Ok(orderDetails);
    }
    
    [HttpGet("all/sorted")]
    public async Task<IActionResult> GetAllOrders([FromQuery] SortOrdersRequest sortOrdersRequest)
    {
        var orders = await _orderService.GetAllOrders(sortOrdersRequest);
        return Ok(orders);
    }
    
    // [HttpGet("load/data")]
    // // [Authorize(Policy = "ManagerPolicy")]
    // public async Task<IActionResult> LoadClientData([FromQuery] FindOrderRequest request)
    // {
    //     return Ok(await _orderService.FindOrder(request));
    // }
}