using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.TasksRep;

public interface ITasksRep : IRepository<Tasks>
{
    public Task AddDependency(Client client, Order order, User user, Tasks task);
}