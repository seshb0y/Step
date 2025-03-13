using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Task;

namespace CRMSolution.Services.Interfaces;

public interface ITasksService
{
    public Task CreateTaskAsync(CreateTaskRequest request);
    public Task UpdateTaskAsync(UpdateTaskRequest request);
    public Task DeleteTaskAsync(DeleteTaskRequest request);
    public Task<TaskResponse> FindTaskByIdAsync(FindTaskRequest request);
    public Task<GetAllTasksResponse> GetAllTasks(SortTasksRequest sortTasksRequest);
}