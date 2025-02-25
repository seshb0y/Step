using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using FluentValidation;

namespace CRMSolution.Data.Validators.Tasks;

public class FindTaskValidator : AbstractValidator<FindTaskRequest>
{
    IRepository<Task> _taskRepository;

    public FindTaskValidator(IRepository<Task> taskRepository)
    {
        _taskRepository = taskRepository;
        
        RuleFor(r => r.taskId)
            .NotEmpty()
            .WithMessage("Task Id cannot be empty")
            .MustAsync(IsTaskExist)
            .WithMessage("Task not found");
    }

    private async Task<bool> IsTaskExist(string id, CancellationToken cancellationToken)
    {
        var task = await _taskRepository.GetById(Guid.Parse(id));
        return task != null;
    }
}