using ControllerFirst.DTO.Requests;
using ControllerFirst.Shared;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using FluentValidation;

namespace CRMSolution.Data.Validators.Auth;

public class LoginValidator : AbstractValidator<LoginRequest>
{
    IClientRep _clientRepository;
    public LoginValidator(IClientRep clientRepository)
    {
        _clientRepository = clientRepository;
        
        RuleFor(x => x.username)
            .NotEmpty()
            .WithMessage("Username is required")
            .NotNull()
            .WithMessage("Username is required")
            .Matches(RegexPattern.Username)
            .WithMessage("Username must be at least 6 characters long and contain only letters, numbers, underscores, and hyphens")
            .MustAsync(IsClientExist)
            .WithMessage("The client ID does not exist.");

        RuleFor(x => x.password)
            .NotEmpty()
            .WithMessage("Password is required")
            .NotNull()
            .WithMessage("Password is required")
            .Matches(RegexPattern.Password)
            .WithMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number");
        
    }
    
    private async Task<bool> IsClientExist(string name, CancellationToken cancellationToken)
    {
        var client = await _clientRepository.GetClientByName(name);
        return client != null;
    }
}