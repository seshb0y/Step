using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using FluentValidation;

namespace CRMSolution.Data.Validators.Order;

public class CreateOrderValidator : AbstractValidator<CreateOrderRequest>
{
    IRepository<Client> _clientRepository;
    
    public CreateOrderValidator(IRepository<Client> repository)
    {
        _clientRepository = repository;
        RuleFor(r => r.totalAmount)
            .NotEmpty()
            .WithMessage("Invalid total amount.")
            .NotNull()
            .WithMessage("Invalid total amount.");
        
        RuleFor(r => r.clientId)
            .NotEmpty()
            .WithMessage("Invalid client ID.")
            .MustAsync(IsClientExist)
            .WithMessage("The client ID does not exist.");
    }

    private async Task<bool> IsClientExist(string clientId, CancellationToken cancellationToken)
    {
        var client = await _clientRepository.GetById(Guid.Parse(clientId));
        return client != null;
    }
}