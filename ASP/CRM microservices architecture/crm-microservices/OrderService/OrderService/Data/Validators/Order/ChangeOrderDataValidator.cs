using System.Data;
using FluentValidation;
using OrderService.Data.Repository.Interface;
using OrderService.DTO.Requests;

namespace OrderService.Data.Validators.Order;

public class ChangeOrderDataValidator : AbstractValidator<HttpChangeOrderDataRequest>
{
    
    IRepository<Models.Order> _orderRepository;
    
    public ChangeOrderDataValidator(IRepository<Models.Order> orderRepository)
    {
        _orderRepository = orderRepository;
        
        RuleFor(r => r.orderId)
            .NotEmpty()
            .WithMessage("Invalid order ID.")
            .MustAsync(IsOrderExist)
            .WithMessage("Order with this ID is not found.");

        RuleFor(r => r.totalAmount)
            .NotEmpty()
            .WithMessage("Invalid total amount.")
            .NotNull()
            .WithMessage("Invalid total amount.");
    }

    private async Task<bool> IsOrderExist(int id, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetById(id);
        return order != null;
    }
}