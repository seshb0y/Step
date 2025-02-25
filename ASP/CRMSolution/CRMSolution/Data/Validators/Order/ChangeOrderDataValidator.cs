using System.Data;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using FluentValidation;

namespace CRMSolution.Data.Validators.Order;

public class ChangeOrderDataValidator : AbstractValidator<ChangeOrderDataRequest>
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

    private async Task<bool> IsOrderExist(string id, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetById(Guid.Parse(id));
        return order != null;
    }
}