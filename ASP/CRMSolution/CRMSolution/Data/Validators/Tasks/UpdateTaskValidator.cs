using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using FluentValidation;

namespace CRMSolution.Data.Validators.Tasks;

public class UpdateTaskValidator : AbstractValidator<UpdateTaskRequest>
{
    IRepository<Task> _taskRepository;

    public UpdateTaskValidator(IRepository<Task> taskRepository)
    {
        _taskRepository = taskRepository;
        
        RuleFor(r => r.taskId)
            .NotEmpty()
            .WithMessage("Task Id cannot be empty")
            .MustAsync(IsTaskExist)
            .WithMessage("Task not found");
        
        RuleFor(r => r.description)
            .NotEmpty()
            .WithMessage("Description cannot be empty")
            .NotNull()
            .WithMessage("Description cannot be null");

        RuleFor(r => r.status)
            .IsInEnum()
            .WithMessage("Status cannot be empty");

    }

    private async Task<bool> IsTaskExist(Guid id, CancellationToken cancellationToken)
    {
        var task = await _taskRepository.GetById(id);
        return task != null;
    }
}