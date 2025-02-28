using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }


    [HttpPost("AddClient")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> AddClient([FromBody] CreateClientRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("ChangeClient")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> ChangeClient([FromBody] ChangeDataClientRequest request)
    {
        throw new Exception();
    }
    
    [HttpPost("DeleteClient")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> DeleteClient([FromBody] DeleteClientRequest request)
    {
        throw new Exception();
    }
    
    [HttpGet("FindClient")]
    [Authorize(Policy = "ManagerPolicy")]
    public async Task<IActionResult> FindClient([FromQuery] FindClientRequest request)
    {
        throw new Exception();
    }
}