using ControllerFirst.Shared;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.DTO.Requests;
using FluentValidation;

namespace CRMSolution.Data.Validators.User;

public class ChangeUserDataValidator : AbstractValidator<ChangeUserDataRequest>
{
    IUserRep _userRep;
    
    public ChangeUserDataValidator(IUserRep userRep)
    {
        _userRep = userRep;
        
        RuleFor(x => x.username)
            .MinimumLength(2).WithMessage("Name must be at least 2 characters");

        RuleFor(x => x.newEmail)
            .EmailAddress().WithMessage("Invalid email address");

        RuleFor(x => x.oldEmail)
            .MustAsync(IsClientExist)
            .WithMessage("The client email does not exist.");
        
        RuleFor(x => x.password)
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long")
            .Matches(RegexPattern.Password)
            .WithMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number");
    }

    private async Task<bool> IsClientExist(string email, CancellationToken cancellationToken)
    {
        var client = await _userRep.FindByEmailAsync(email);
        return client != null;
    }
}