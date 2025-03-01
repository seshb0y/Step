using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace CRMSolution.Data.Repository.TasksRep;

public class TasksRep : Repository<Tasks>, ITasksRep
{
    public TasksRep(CRMContext context) : base(context)
    {
        
    }

    public async Task AddDependency(Order order, User user, Tasks task)
    {
        task.Order = order;
        task.UserTasks.Add(
            new UserTask
            {
                UserId = user.Id,
                TaskId = task.Id,
                User = user,
                Task = task
            });
        await AddAsync(task);
    }

    public async Task<Tasks> GetById(Guid taskId)
    {
        return await _context.Tasks
            .Include(t => t.Order)
            .Include(t => t.UserTasks)
            .ThenInclude(ut => ut.User)
            .FirstOrDefaultAsync(t => t.Id == taskId);
    }
}