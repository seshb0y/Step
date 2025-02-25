using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Task;

namespace CRMSolution.Services.Interfaces;

public interface ITasks
{
    public Task CreateTaskAsync(CreateTaskRequest request);
    public Task UpdateTaskAsync(UpdateTaskRequest request);
    public Task DeleteTaskAsync(DeleteTaskRequest request);
    public Task<Tasks> FindTaskByIdAsync(FindTaskRequest request);
}