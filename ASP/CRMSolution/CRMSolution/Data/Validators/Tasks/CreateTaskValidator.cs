using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using FluentValidation;

namespace CRMSolution.Data.Validators.Tasks;

public class CreateTaskValidator : AbstractValidator<CreateTaskRequest>
{
    IUnitOfWork _unitOfWork;

    public CreateTaskValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

        RuleFor(r => r.title)
            .NotNull()
            .WithMessage("Title is required.")
            .NotEmpty()
            .WithMessage("Title is required.");
        
        RuleFor(r => r.description)
            .NotNull()
            .WithMessage("Description is required.")
            .NotEmpty()
            .WithMessage("Description is required.");
        
        RuleFor(r => r.endDate)
            .NotNull()
            .WithMessage("End date is required.")
            .NotEmpty()
            .WithMessage("End date is required.");
        
        RuleFor(r => r.userEmail)
            .NotNull()
            .WithMessage("User email is required.")
            .MustAsync(IsUserExist)
            .WithMessage("The user email does not exist.");
        
        RuleFor(r => r.orderId)
            .NotNull()
            .WithMessage("OrderId is required.")
            .MustAsync(IsOrderExist)
            .WithMessage("The order ID does not exist.");
    }

    private async Task<bool> IsOrderExist(Guid id, CancellationToken cancellationToken)
    {
        var task = await _unitOfWork.OrderRep.GetById(id);
        return task != null;
    }
    private async Task<bool> IsUserExist(string email, CancellationToken cancellationToken)
    {
        var task = await _unitOfWork.UserRep.FindByEmailAsync(email);
        return task != null;
    }
}