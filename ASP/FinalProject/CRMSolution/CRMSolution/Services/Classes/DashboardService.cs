using AutoMapper;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace CRMSolution.Services.Classes;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<DashboardService> _logger;
    private readonly INotificationService _notificationService;

    public DashboardService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DashboardService> logger, INotificationService notificationService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
        _notificationService = notificationService;
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

    public async Task<DashboardData> GetDashboardData(string userId)
    {
        _logger.LogInformation("Получение данных дашборда для пользователя: {UserId}", userId);
        var data = await _unitOfWork.GetDashboardData(userId);
        await _notificationService.NotifyDashboardUpdated(userId);
        return data;
    }

    public async Task<DashboardData> GetAdminDashboardData()
    {
        _logger.LogInformation("Получение данных дашборда для администратора");
        var data = await _unitOfWork.GetAdminDashboardData();
        await _notificationService.NotifyDashboardUpdated(null);
        return data;
    }
}