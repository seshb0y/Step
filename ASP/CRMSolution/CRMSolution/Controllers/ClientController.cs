using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }


    [HttpPost("Add/Client")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddClient([FromBody] CreateClientRequest request)
    {
        
        return Ok(await _clientService.CreateClient(request));
    }
    
    [HttpPut("Change")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeClient([FromBody] ChangeDataClientRequest request, 
        [FromServices] IValidator<ChangeDataClientRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        
        return Ok(await _clientService.ChangeDataClient(request));
    }
    
    [HttpDelete("Delete")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteClient([FromBody] DeleteClientRequest request)
    {
        await _clientService.DeleteClient(request);
        return Ok("Client deleted");
    }
    
    [HttpGet("Load/Client/Data")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> LoadClientData([FromQuery] FindClientRequest request)
    {
        return Ok(await _clientService.FindClient(request));
    }

    [HttpGet("GetAllClients")]
    public async Task<IActionResult> GetAllClients([FromQuery] SortClientsRequest sortClientsRequest)
    {
        var clients = await _clientService.GetAllClients(sortClientsRequest);
        return Ok(clients);
    }
    
    [HttpGet("Get/Clients/With/Orders/And/Tasks")]
    public async Task<IActionResult> GetClientsWithOrdersAndTasks()
    {
        var clients = await _clientService.GetClientsWithOrdersAndTasks();
        return Ok(clients);
    }



}