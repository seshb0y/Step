using CRMSolution.Data.Repository;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers;

[ApiController]
[Route("[controller]/")]
public class DashboardController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDashboardService  _dashboardService;

    public DashboardController(IUnitOfWork unitOfWork,  IDashboardService dashboardService)
    {
        _unitOfWork = unitOfWork;
        _dashboardService = dashboardService;
    }

    [HttpGet("getDashboardData")]
    public async Task<IActionResult> GetDashboardData()
    {
        return Ok(await _dashboardService.GetDashboard());
    }
}