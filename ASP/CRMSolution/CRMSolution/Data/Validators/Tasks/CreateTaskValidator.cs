using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Task;
using FluentValidation;

namespace CRMSolution.Data.Validators.Tasks;

public class CreateTaskValidator : AbstractValidator<CreateTaskRequest>
{
    IRepository<Models.Order> _orderRepository;
    IRepository<Client> _clientRepository;
    IRepository<User> _userRepository;

    public CreateTaskValidator(IRepository<Models.Order> orderRepository, IRepository<Client> clientRepository, IRepository<User> userRepository)
    {
        _orderRepository = orderRepository;
        _clientRepository = clientRepository;
        _userRepository = userRepository;

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
        
        RuleFor(r => r.clientId)
            .NotNull()
            .WithMessage("ClientId is required.")
            .MustAsync(IsClientExist)
            .WithMessage("The client ID does not exist.");
        
        RuleFor(r => r.userId)
            .NotNull()
            .WithMessage("UserId is required.")
            .MustAsync(IsUserExist)
            .WithMessage("The user ID does not exist.");
        
        RuleFor(r => r.orderId)
            .NotNull()
            .WithMessage("OrderId is required.")
            .MustAsync(IsOrderExist)
            .WithMessage("The order ID does not exist.");
    }

    private async Task<bool> IsOrderExist(string id, CancellationToken cancellationToken)
    {
        var task = await _orderRepository.GetById(Guid.Parse(id));
        return task != null;
    }
    private async Task<bool> IsUserExist(string id, CancellationToken cancellationToken)
    {
        var task = await _userRepository.GetById(Guid.Parse(id));
        return task != null;
    }
    private async Task<bool> IsClientExist(string id, CancellationToken cancellationToken)
    {
        var task = await _clientRepository.GetById(Guid.Parse(id));
        return task != null;
    }
}