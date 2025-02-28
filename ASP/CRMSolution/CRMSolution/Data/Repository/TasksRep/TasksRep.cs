using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

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
}