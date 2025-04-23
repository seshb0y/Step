using ControllerFirst.DTO.Requests;
using ControllerFirst.Shared;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.UserRep;
using FluentValidation;

namespace CRMSolution.Data.Validators.Auth;

public class LoginValidator : AbstractValidator<LoginRequest>
{
    IUserRep _userRep;
    public LoginValidator(IUserRep userRep)
    {
        _userRep = userRep;
        
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
        var user = await _userRep.FindByNameAsync(name);
        return user != null;
    }
}