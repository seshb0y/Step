using FluentValidation;
using OrderService.Data.Repository.Interface;
using OrderService.DTO.Requests;

namespace OrderService.Data.Validators.Order;

public class FindOrderValidator : AbstractValidator<FindOrderRequest>
{
    IRepository<Models.Order> _orderRepository;

    public FindOrderValidator(IRepository<Models.Order> orderRepository)
    {
        _orderRepository = orderRepository;
        
        RuleFor(r => r.orderId)
            .NotEmpty()
            .WithMessage("Invalid order ID.")
            .MustAsync(IsOrderExist)
            .WithMessage("The order ID does not exist.");
    }

    private async Task<bool> IsOrderExist(int id, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetById(id);
        return order != null;
    }
}