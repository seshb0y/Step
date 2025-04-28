// using Bogus;
// using OrderService.Data;
// using OrderService.Data.Models;
//
// namespace TaskService.Services;
//
// public class DataSeeder
// {
//     private readonly OrderDbContext _context;
//
//     public DataSeeder(OrderDbContext context)
//     {
//         _context = context;
//     }
//
//     public void Seed()
//     {
//         int orderId = 1;
//         var orderFaker = new Faker<Order>()
//             .RuleFor(o => o.TotalAmount, f => f.Finance.Amount(500, 10000))
//             .RuleFor(o => o.Status, f => f.PickRandom<OrderStatus>())
//             .RuleFor(o => o.CreatedAt, f => f.Date.Past(1));
//
//         var orders = orderFaker.Generate(30);
//         
//         _context.Orders.AddRange(orders);
//         _context.SaveChanges(); 
//     }
// }
