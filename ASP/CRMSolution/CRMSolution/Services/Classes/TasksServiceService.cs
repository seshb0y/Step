using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using CRMSolution.Services.Interfaces;
using TaskStatus = CRMSolution.Data.Models.TaskStatus;

namespace CRMSolution.Services.Classes;

public class TasksServiceService : ITasksService
{
    IRepository<Tasks> _tasksRepository;
    IRepository<Client> _clientsRepository;
    IRepository<User> _usersRepository;
    IRepository<Order> _orderRepository;
    IMapper _mapper;

    public TasksServiceService(IRepository<Tasks> tasksRepository, IRepository<Client> clientsRepository,
        IRepository<User> usersRepository, IRepository<Order> orderRepository, IMapper mapper)
    {
        _tasksRepository = tasksRepository;
        _clientsRepository = clientsRepository;
        _usersRepository = usersRepository;
        _orderRepository = orderRepository;
        _mapper = mapper;
    }
    
    public async Task CreateTaskAsync(CreateTaskRequest request)
    {
        Client client = await _clientsRepository.GetById(Guid.Parse(request.clientId));
        Order order = await _orderRepository.GetById(Guid.Parse(request.orderId));
        User user = await _usersRepository.GetById(Guid.Parse(request.userId));
        Tasks task = _mapper.Map<Tasks>(request);
        await _tasksRepository.AddAsync(task);
        await _tasksRepository.SaveChangesAsync();
        
    }

    public async Task UpdateTaskAsync(UpdateTaskRequest request)
    {
        Tasks task = await _tasksRepository.GetById(Guid.Parse(request.taskId));
        task = _mapper.Map<Tasks>(request);
        await _tasksRepository.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(DeleteTaskRequest request)
    {
        Tasks task = await _tasksRepository.GetById(Guid.Parse(request.taskId));
        _tasksRepository.Delete(task);
        await _tasksRepository.SaveChangesAsync();
    }

    public async Task<Tasks> FindTaskByIdAsync(FindTaskRequest request)
    {
        Tasks task = await _tasksRepository.GetById(Guid.Parse(request.taskId));
        return task;
    }
}