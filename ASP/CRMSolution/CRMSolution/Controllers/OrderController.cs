using AutoMapper;
using CRMSolution.DTO.Requests;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }


    [HttpPost("AddOrder")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddOrder([FromBody] CreateOrderRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("ChangeOrder")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeOrder([FromBody] ChangeOrderDataRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("DeleteOrder")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteOrder([FromBody] DeleteOrderRequest request)
    {
        throw new Exception();
    }
    
    [HttpGet("FindOrder")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindOrder([FromQuery] FindOrderRequest request)
    {
        throw new Exception();
    }
}