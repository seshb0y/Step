using CRMSolution.DTO.Requests.Client;
using FluentValidation;

namespace CRMSolution.Data.Validators;

public class DeleteClientValidator : AbstractValidator<DeleteClientRequest>
{
    public DeleteClientValidator()
    {
        RuleFor(x => x.id)
            .NotEmpty()
            .WithMessage("Id is required")
            .Must(id => Guid.TryParse(id, out _))
            .WithMessage("Invalid id format");
    }
}