//
// using FluentValidation;
// using OrderService.DTO.Requests;
//
// namespace OrderService.Data.Validators.Order;
//
// public class CreateOrderValidator : AbstractValidator<CreateOrderRequest>
// {
//     IClientRep _clientRepository;
//     
//     public CreateOrderValidator(IClientRep repository)
//     {
//         _clientRepository = repository;
//         RuleFor(r => r.totalAmount)
//             .NotEmpty()
//             .WithMessage("Invalid total amount.")
//             .NotNull()
//             .WithMessage("Invalid total amount.");
//         
//         RuleFor(r => r.clientEmail)
//             .NotEmpty()
//             .WithMessage("Invalid client email.")
//             .MustAsync(IsClientExist)
//             .WithMessage("The client email does not exist.");
//     }
//
//     private async Task<bool> IsClientExist(string email, CancellationToken cancellationToken)
//     {
//         var client = await _clientRepository.GetClientByEmail(email);
//         return client != null;
//     }
// }