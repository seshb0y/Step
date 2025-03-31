using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace CRMSolution.Services.Classes
{
    public class OrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<OrderService> _logger;

        public OrderService(IUnitOfWork unitOfWork, ILogger<OrderService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task ChangeDataOrder(ChangeOrderDataRequest request)
        {
            _logger.LogInformation("Изменяем заказ: {@Request}", request);
            Order order = await _unitOfWork.OrderRep.GetById(request.orderId);
            
            if (order == null)
            {
                throw new KeyNotFoundException($"Order with id {request.orderId} not found");
            }

            // Обновляем только нужные поля
            order.TotalAmount = request.totalAmount;
            order.Status = request.status;
            
            _unitOfWork.OrderRep.Update(order);
            await _unitOfWork.SaveChangesAsync();
        }
    }
} 