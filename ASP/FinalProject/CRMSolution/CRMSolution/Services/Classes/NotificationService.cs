using CRMSolution.Data.Models;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace CRMSolution.Services.Classes
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(IHubContext<NotificationHub> hubContext, ILogger<NotificationService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }

        public async Task NotifyOrderStatusChanged(Order order)
        {
            try
            {
                var message = $"Статус заказа #{order.Id} изменен на {order.Status}";
                if (order.AssignedUserId != null)
                {
                    await _hubContext.Clients.User(order.AssignedUserId).SendAsync("ReceiveNotification", message);
                }
                await _hubContext.Clients.All.SendAsync("OrderStatusChanged", order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке уведомления об изменении статуса заказа");
            }
        }

        public async Task NotifyTaskAssigned(Tasks task)
        {
            try
            {
                var message = $"Вам назначена новая задача: {task.Title}";
                if (task.AssignedToId != null)
                {
                    await _hubContext.Clients.User(task.AssignedToId).SendAsync("ReceiveNotification", message);
                }
                await _hubContext.Clients.All.SendAsync("TaskAssigned", task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке уведомления о назначении задачи");
            }
        }

        public async Task NotifyClientCreated(Client client)
        {
            try
            {
                var message = $"Создан новый клиент: {client.Name}";
                await _hubContext.Clients.All.SendAsync("ClientCreated", client);
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке уведомления о создании клиента");
            }
        }

        public async Task NotifyUserCreated(User user)
        {
            try
            {
                var message = $"Создан новый пользователь: {user.Username}";
                await _hubContext.Clients.All.SendAsync("UserCreated", user);
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке уведомления о создании пользователя");
            }
        }

        public async Task NotifyTaskStatusChanged(Tasks task)
        {
            try
            {
                var message = $"Статус задачи '{task.Title}' изменен на {task.Status}";
                if (task.AssignedToId != null)
                {
                    await _hubContext.Clients.User(task.AssignedToId).SendAsync("ReceiveNotification", message);
                }
                await _hubContext.Clients.All.SendAsync("TaskStatusChanged", task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке уведомления об изменении статуса задачи");
            }
        }

        public async Task NotifyGeneral(string message, string userId = null)
        {
            try
            {
                if (userId != null)
                {
                    await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", message);
                }
                else
                {
                    await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке общего уведомления");
            }
        }
    }
} 