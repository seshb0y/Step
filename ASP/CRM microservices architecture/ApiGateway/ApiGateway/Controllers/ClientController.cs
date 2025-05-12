using ApiGateway.DTO.Requests.Client;
using CRMSolution.Grpc.Client;
using FluentValidation;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("api/v1/clients/")]
public class ClientController : ControllerBase
{
    private readonly ClientGrpcService.ClientGrpcServiceClient _clientService;

    public ClientController(ClientGrpcService.ClientGrpcServiceClient clientService)
    {
        _clientService = clientService;
    }


    [HttpPost]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddClient([FromBody] HttpCreateClientRequest request)
    {
        var grpcRequest = new CreateClientRequest
        {
            Name = request.name,
            Address = request.address,
            Email = request.email,
            Phone = request.phone,
        };
        var grpcResponse = await _clientService.CreateClientAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpPut]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeClient([FromBody] HttpChangeDataClientRequest request)
    {
        // var validationResult = await validator.ValidateAsync(request);
        // if (!validationResult.IsValid)
        // {
        //     return BadRequest(validationResult.Errors);
        // }
        var grpcRequest = new ChangeDataClientRequest
        {
            Name = request.name,
            Address = request.address,
            Email = request.newEmail,
            OldEmail = request.oldEmail,
            Phone = request.phone,
        };
        var grpcResponse = await _clientService.ChangeDataClientAsync(grpcRequest);
        
        return Ok(grpcResponse);
    }
    
    [HttpDelete]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteClient([FromBody] HttpDeleteClientRequest request)
    {
        var grpcRequest = new DeleteClientRequest
        {
            Email = request.email,
        };
        var grpcResponse = await _clientService.DeleteClientAsync(grpcRequest);
        return Ok("Client deleted");
    }
    
    [HttpGet("search")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> LoadClientData([FromQuery] HttpFindClientRequest request)
    {
        var grpcRequest = new GetClientByEmailRequest
        {
            Email = request.email,
            OrderId = 0
        };
        var grpcResponse = await _clientService.GetClientByEmailAsync(grpcRequest);
        return Ok(grpcResponse);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClients([FromQuery] HttpSortClientsRequest sortClientsRequest)
    {
        var grpcRequest = new GetAllClientsRequest
        {
            Sort = new SortClientRequest
            {
                SortBy = sortClientsRequest.sortBy,
                Descending = sortClientsRequest.Descending
            }
        };
        var grpcResponse = await _clientService.GetAllClientsAsync(grpcRequest);
        return Ok(grpcResponse);
    }
    
    [HttpGet("relations")]
    public async Task<IActionResult> GetClientsWithOrdersAndTasks()
    {
        string? accessToken = Request.Cookies["accessToken"];
        var metadata = new Metadata();
        metadata.Add("authorization", accessToken);
        var grpcRequest = new GetClientWithOrdersAndTasksRequest();
        var grpcResponse = await _clientService.GetClientsWithOrdersAndTasksAsync(grpcRequest, metadata);
        return Ok(grpcResponse);
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var grpcResponse = _clientService.GetDashboardData(new GetDashboardDataRequest());
        return Ok(grpcResponse);
    }


}