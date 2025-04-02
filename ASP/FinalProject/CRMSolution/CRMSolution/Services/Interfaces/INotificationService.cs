using CRMSolution.Data.Models;

namespace CRMSolution.Services.Interfaces
{
    public interface INotificationService
    {
        Task NotifyOrderStatusChanged(Order order);
        Task NotifyTaskAssigned(Tasks task);
        Task NotifyClientCreated(Client client);
        Task NotifyUserCreated(User user);
        Task NotifyTaskStatusChanged(Tasks task);
        Task NotifyGeneral(string message, string userId = null);
        Task NotifyOrderCreated(Order order);
        Task NotifyOrderUpdated(Order order);
        Task NotifyOrderDeleted(Order order);
        Task NotifyOrderResponsibleChanged(Order order, User newResponsible);
        Task NotifyTaskCreated(Tasks task);
        Task NotifyTaskUpdated(Tasks task);
        Task NotifyTaskDeleted(Tasks task);
        Task NotifyTaskCompleted(Tasks task);
        Task NotifyClientUpdated(Client client);
        Task NotifyClientDeleted(Client client);
        Task NotifyClientContactAdded(Client client, Contact contact);
        Task NotifyUserUpdated(User user);
        Task NotifyUserDeleted(User user);
        Task NotifyUserRoleChanged(User user, string newRole);
        Task NotifyAccountCreated(Account account);
        Task NotifyAccountUpdated(Account account);
        Task NotifyAccountDeleted(Account account);
        Task NotifyUserLoggedIn(User user);
        Task NotifyUserLoggedOut(User user);
        Task NotifyPasswordChanged(User user);
        Task NotifyDashboardUpdated(string userId);
    }
} 