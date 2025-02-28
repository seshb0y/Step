using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using FluentValidation;

namespace CRMSolution.Data.Validators.Order;

public class DeleteOrderValidator : AbstractValidator<DeleteOrderRequest>
{
    IRepository<Models.Order> _orderRepository;

    public DeleteOrderValidator(IRepository<Models.Order> orderRepository)
    {
        _orderRepository = orderRepository;
        
        RuleFor(r => r.orderId)
            .NotEmpty()
            .WithMessage("Invalid order ID.")
            .MustAsync(IsOrderExist)
            .WithMessage("The order ID does not exist.");
    }

    private async Task<bool> IsOrderExist(Guid id, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetById(id);
        return order != null;
    }
}