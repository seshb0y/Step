using ControllerFirst.DTO.Responses;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
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

    public async Task<Tasks> GetById(int taskId)
    {
        return await _context.Tasks
            .Include(t => t.Order)
            .Include(t => t.UserTasks)
            .ThenInclude(ut => ut.User)
            .FirstOrDefaultAsync(t => t.Id == taskId);
    }
    
    
    public async Task<List<TaskDto>> GetLowInfoTasksList(SortTasksRequest sortTasksRequest)
    {
        var query = _dbSet
            .Include(t => t.Order)
            .Include(t => t.UserTasks)
            .ThenInclude(ut => ut.User)
            .Select(t => new TaskDto
            {
                TaskId = t.Id,
                OrderId = t.Order.Id,
                Title = t.Title,
                Status = t.Status,
                DueDate = t.DueDate,
                Username = t.UserTasks.Select(ut => ut.User.Username).FirstOrDefault()
            });

        query = sortTasksRequest.sortBy?.ToLower() switch
        {
            "taskid" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.TaskId) : query.OrderBy(c => c.TaskId),
            "title" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Title) : query.OrderBy(c => c.Title),
            "status" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status),
            "duedate" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.DueDate) : query.OrderBy(c => c.DueDate),
            "username" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Username) : query.OrderBy(c => c.Username),
            _ => query
        };

        return await query.ToListAsync();
    }
}