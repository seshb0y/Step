using AutoMapper;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public DashboardService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    } 
    
    public async Task<DashboardResponse> GetDashboard()
    {
        List<Client> clients = new List<Client>();
        clients.AddRange(await _unitOfWork.ClientRep.GetAllAsync());
        List<Order> orders = new List<Order>();
        orders.AddRange(await _unitOfWork.OrderRep.GetAllAsync());
        List<Tasks> tasks = new List<Tasks>();
        tasks.AddRange(await _unitOfWork.TasksRep.GetAllAsync());
        List<User> users = new List<User>();
        users.AddRange(await _unitOfWork.UserRep.GetAllAsync());
        
        var ordersTotalAmount = orders.Sum(o => o.TotalAmount);
        var ordersCreatedDates = orders.Select(o => o.CreatedAt).ToList();
        var taskStatuses = tasks.Select(t => t.Status).ToList();

        return new DashboardResponse
        {
            ClientsAmount = clients.Count,
            OrdersCreatedDates = ordersCreatedDates,
            OrdersTotalAmount = ordersTotalAmount,
            TasksStatuses =  taskStatuses,
            OrdersCount = orders.Count,
            TasksCount = tasks.Count,
        };
    }
}