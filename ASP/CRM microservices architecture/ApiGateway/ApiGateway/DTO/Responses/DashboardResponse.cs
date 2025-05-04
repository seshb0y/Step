using CRMSolution.Data.Models;

namespace ApiGateway.DTO.Responses;

public class DashboardResponse
{
    public decimal OrdersTotalAmount { get; set; }
    public int OrdersCount { get; set; }
    
    public List<DateTime> OrdersCreatedDates { get; set; }
    public int ClientsAmount { get; set; }
    
    public List<TasksStatus> TasksStatuses { get; set; }
    public int TasksCount { get; set; }
    
}