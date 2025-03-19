using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;

namespace CRMSolution.Data.Repository.TasksRep;

public interface ITasksRep : IRepository<Tasks>
{
    public Task AddDependency(Order order, User user, Tasks task);

    public Task<Tasks> GetById(int taskId);
    
    Task<List<TaskDto>> GetLowInfoTasksList(SortTasksRequest sortTasksRequest);
}