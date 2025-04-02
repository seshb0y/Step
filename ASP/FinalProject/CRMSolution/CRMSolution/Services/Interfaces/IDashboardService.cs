using ControllerFirst.DTO.Responses;

namespace CRMSolution.Services.Interfaces;

public interface IDashboardService
{
    public Task<DashboardResponse>  GetDashboard();
}