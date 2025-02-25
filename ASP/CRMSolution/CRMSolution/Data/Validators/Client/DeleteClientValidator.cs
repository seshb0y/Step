using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using FluentValidation;

namespace CRMSolution.Data.Validators;

public class DeleteClientValidator : AbstractValidator<DeleteClientRequest>
{
    IRepository<Client> _clientRepository;
    
    public DeleteClientValidator(IRepository<Client> clientRepository)
    {
        _clientRepository = clientRepository;
        
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