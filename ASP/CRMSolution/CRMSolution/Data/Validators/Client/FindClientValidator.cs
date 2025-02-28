using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using CRMSolution.DTO.Requests.Client;
using FluentValidation;

namespace CRMSolution.Data.Validators;

public class FindClientValidator : AbstractValidator<FindClientRequest>
{
    IClientRep _clientRepository;
    
    public FindClientValidator(IClientRep clientRepository)
    {
        _clientRepository = clientRepository;
        
        RuleFor(x => x.email)
            .NotEmpty()
            .WithMessage("Email is required")
            .MustAsync(IsClientExist)
            .WithMessage("The client email does not exist.");
    }
    private async Task<bool> IsClientExist(string email, CancellationToken cancellationToken)
    {
        var client = await _clientRepository.GetClientByEmail(email);
        return client != null;
    }
}