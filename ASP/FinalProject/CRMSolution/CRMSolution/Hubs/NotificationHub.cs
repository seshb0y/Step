using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace CRMSolution.Hubs
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private readonly ILogger<NotificationHub> _logger;

        public NotificationHub(ILogger<NotificationHub> logger)
        {
            _logger = logger;
        }

        public async Task SendNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            _logger.LogInformation($"Пользователь {Context.User?.Identity?.Name} присоединился к группе {groupName}");
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            _logger.LogInformation($"Пользователь {Context.User?.Identity?.Name} покинул группу {groupName}");
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User?.Identity?.Name != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
                _logger.LogInformation($"Пользователь {Context.User.Identity.Name} подключился");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (Context.User?.Identity?.Name != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
                _logger.LogInformation($"Пользователь {Context.User.Identity.Name} отключился");
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
} 