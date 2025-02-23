using CRMSolution.DTO.Requests.Client;
using FluentValidation;

namespace CRMSolution.Data.Validators;

public class FindClientValidator : AbstractValidator<FindClientRequest>
{
    public FindClientValidator()
    {
        RuleFor(x => x.id)
            .NotEmpty()
            .WithMessage("Id is required")
            .Must(id => Guid.TryParse(id, out _))
            .WithMessage("Invalid id format");
    }
}