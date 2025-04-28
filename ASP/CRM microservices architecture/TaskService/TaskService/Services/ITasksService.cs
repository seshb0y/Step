using TaskService.Data.Models;
using TaskService.DTO.Requests.Task;
using TaskService.DTO.Responses;

namespace TaskService.Services.Interfaces;

public interface ITasksService
{
    public Task CreateTaskAsync(CreateTaskRequest request);
    public Task UpdateTaskAsync(UpdateTaskRequest request);
    public Task DeleteTaskAsync(DeleteTaskRequest request);
    public Task<TaskResponse> FindTaskByIdAsync(FindTaskRequest request);
    public Task<GetAllTasksResponse> GetAllTasks(SortTasksRequest sortTasksRequest);
    Task<TaskEntity> GetByIdAsync(int id);

}