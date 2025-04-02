using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using FluentValidation;

namespace CRMSolution.Data.Validators.Tasks;

public class DeleteTaskValidator : AbstractValidator<DeleteTaskRequest>
{
    IRepository<Task> _taskRepository;

    public DeleteTaskValidator(IRepository<Task> taskRepository)
    {
        _taskRepository = taskRepository;
        
        RuleFor(r => r.taskId)
            .NotEmpty()
            .WithMessage("Task Id cannot be empty")
            .MustAsync(IsTaskExist)
            .WithMessage("Task not found");
    }

    private async Task<bool> IsTaskExist(int id, CancellationToken cancellationToken)
    {
        var task = await _taskRepository.GetById(id);
        return task != null;
    }
}