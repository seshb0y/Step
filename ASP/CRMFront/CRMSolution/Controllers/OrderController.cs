using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace CRMSolution.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderService _orderService;

        public OrderController(ILogger<OrderController> logger, IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpPut("change")]
        public async Task<IActionResult> ChangeOrder([FromBody] ChangeOrderDataRequest request)
        {
            _logger.LogInformation("Получен запрос на изменение заказа: {@Request}", request);
            await _orderService.ChangeDataOrder(request);
            return Ok("Order changed");
        }
    }
} 