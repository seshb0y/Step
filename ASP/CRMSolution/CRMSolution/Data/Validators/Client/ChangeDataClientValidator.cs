using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using FluentValidation;

namespace CRMSolution.Data.Validators;

public class ChangeDataClientValidator : AbstractValidator<ChangeDataClientRequest>
{
    IRepository<Client> _clientRepository;
    
    public ChangeDataClientValidator(IRepository<Client> clientRepository)
    {
        _clientRepository = clientRepository;
        
        RuleFor(x => x.name)
            .NotEmpty().WithMessage("Name is required")
            .MinimumLength(2).WithMessage("Name must be at least 2 characters");

        RuleFor(x => x.email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email address");

        RuleFor(x => x.phone)
            .NotEmpty().WithMessage("Phone is required")
            .Matches(@"^\+?[0-9]{7,15}$").WithMessage("Invalid phone number");

        RuleFor(x => x.address)
            .NotEmpty().WithMessage("Address is required")
            .MaximumLength(255).WithMessage("Address is too long");

        RuleFor(x => x.id)
            .NotEmpty()
            .WithMessage("Id is required")
            .Must(id => Guid.TryParse(id, out _))
            .WithMessage("Invalid id format")
            .MustAsync(IsClientExist)
            .WithMessage("The client ID does not exist.");
    }

    private async Task<bool> IsClientExist(string id, CancellationToken cancellationToken)
    {
        var client = await _clientRepository.GetById(Guid.Parse(id));
        return client != null;
    }
}