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


    [HttpPost("AddClient")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddClient([FromBody] CreateClientRequest request)
    {
        await _clientService.CreateClient(request);
        return Ok("Client created");
    }
    
    [HttpPost("ChangeClient")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeClient([FromBody] ChangeDataClientRequest request, 
        [FromServices] IValidator<ChangeDataClientRequest> validator)
    {
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        await _clientService.ChangeDataClient(request);
        return Ok("Client data updated");
    }
    
    [HttpPost("DeleteClient")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteClient([FromBody] DeleteClientRequest request)
    {
        await _clientService.DeleteClient(request);
        return Ok("Client deleted");
    }
    
    [HttpGet("FindClient")]
    // [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindClient([FromQuery] FindClientRequest request)
    {
        return Ok(await _clientService.FindClient(request));
    }
}