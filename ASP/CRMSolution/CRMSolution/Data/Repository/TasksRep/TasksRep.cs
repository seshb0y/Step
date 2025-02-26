using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.TasksRep;

public class TasksRep : Repository<Tasks>, ITasksRep
{
    public TasksRep(CRMContext context) : base(context)
    {
        
    }

    public async Task AddDependency(Client client, Order order, User user, Tasks task)
    {
        task.Client = client;
        task.Order = order;
        task.AssignedTo = user;
        await AddAsync(task);
    }
}