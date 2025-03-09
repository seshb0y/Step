using AutoMapper;
using CRMSolution.DTO.Requests;
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


    [HttpPost("AddOrder")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddOrder([FromBody] CreateOrderRequest request)
    {
        await _orderService.CreateOrder(request);
        return Ok("Order created");
    }
    
    [HttpPost("ChangeOrder")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeOrder([FromBody] ChangeOrderDataRequest request)
    {
        await _orderService.ChangeDataOrder(request);
        return Ok("Order changed");
    }
    
    [HttpPost("DeleteOrder")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteOrder([FromBody] DeleteOrderRequest request)
    {
        await _orderService.DeleteOrder(request);
        return Ok("Order deleted");
    }
    
    [HttpGet("find/order")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindOrder([FromQuery] FindOrderRequest request)
    {
        return Ok(await _orderService.FindOrder(request));
    }
    
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetOrderDetails(int orderId)
    {
        var orderDetails = await _orderService.GetOrderDetailsAsync(orderId);

        return Ok(orderDetails);
    }
}