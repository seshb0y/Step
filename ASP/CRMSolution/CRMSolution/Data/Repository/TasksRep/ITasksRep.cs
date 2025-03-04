using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.TasksRep;

public interface ITasksRep : IRepository<Tasks>
{
    public Task AddDependency(Order order, User user, Tasks task);

    public Task<Tasks> GetById(int taskId);
}