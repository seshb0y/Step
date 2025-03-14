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
    
    
    public async Task<List<Tasks>> GetLowInfoTasksList(SortTasksRequest sortTasksRequest)
    {
    var query = _dbSet
        .Include(t => t.Order)
        .Include(t => t.UserTasks)
        .ThenInclude(ut => ut.User)
        .Select(t => new Tasks()
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            DueDate = t.DueDate,
            Status = t.Status,
            Order = t.Order,
            UserTasks = t.UserTasks.Select(ut => new UserTask
            {
                UserId = ut.UserId,
                User = new User
                {
                    Username = ut.User.Username,
                }
            }).ToList()
        });
        
        query = sortTasksRequest.sortBy?.ToLower() switch
        {
            "id" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id),
            "totalamount" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Title) : query.OrderBy(c => c.Title),
            "status" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status),
            "createdat" => sortTasksRequest.Descending ? query.OrderByDescending(c => c.DueDate) : query.OrderBy(c => c.DueDate),
            _ => query
        };

        return await query.ToListAsync();
    }
}