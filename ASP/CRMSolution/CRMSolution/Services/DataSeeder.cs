using Bogus;
using CRMSolution.Data.Models;
using CRMSolution.Contexts;

namespace CRMSolution.Services;

public class DataSeeder
{
    private readonly CRMContext _context;

    public DataSeeder(CRMContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (_context.Users.Any()) return; 

        int userId = 1;
        var userFaker = new Faker<User>()
            // .RuleFor(u => u.Id, f => userId++) 
            .RuleFor(u => u.Username, f => f.Internet.UserName())
            .RuleFor(u => u.Email, f => f.Internet.Email())
            .RuleFor(u => u.PasswordHash, f => f.Internet.Password())
            .RuleFor(u => u.IsEmailConfirmed, f => f.Random.Bool())
            .RuleFor(u => u.Role, f => f.PickRandom<UserRole>())
            .RuleFor(u => u.CreatedAt, f => f.Date.Past(1));

        var users = userFaker.Generate(5);

        int clientId = 1;
        var clientFaker = new Faker<Client>()
            // .RuleFor(c => c.Id, f => clientId++)
            .RuleFor(c => c.Name, f => f.Company.CompanyName())
            .RuleFor(c => c.Email, f => f.Internet.Email())
            .RuleFor(c => c.Phone, f => f.Phone.PhoneNumber("+7 (###) ###-##-##"))
            .RuleFor(c => c.Address, f => f.Address.FullAddress())
            .RuleFor(c => c.CreatedAt, f => f.Date.Past(2));

        var clients = clientFaker.Generate(20);

        int orderId = 1;
        var orderFaker = new Faker<Order>()
            // .RuleFor(o => o.Id, f => orderId++)
            .RuleFor(o => o.TotalAmount, f => f.Finance.Amount(500, 10000))
            .RuleFor(o => o.Status, f => f.PickRandom<OrderStatus>())
            .RuleFor(o => o.CreatedAt, f => f.Date.Past(1));

        var orders = orderFaker.Generate(30);

        _context.Users.AddRange(users);
        _context.Clients.AddRange(clients);
        _context.Orders.AddRange(orders);
        _context.SaveChanges(); 
        
        var taskFaker = new Faker<Tasks>()
            .RuleFor(t => t.Title, f => f.Lorem.Sentence(3))
            .RuleFor(t => t.Description, f => f.Lorem.Paragraph())
            .RuleFor(t => t.Status, f => f.Random.Enum<TasksStatus>())
            .RuleFor(t => t.DueDate, f => f.Date.Future(2))
            .RuleFor(t => t.OrderId, f => f.PickRandom(orders.Select(o => o.Id).ToList()));

        var tasks = taskFaker.Generate(60);
        _context.Tasks.AddRange(tasks);
        _context.SaveChanges();

        var clientUsers = new List<ClientUser>();
        foreach (var user in users)
        {
            var randomClient = clients[new Random().Next(clients.Count)];
            clientUsers.Add(new ClientUser { ClientId = randomClient.Id, UserId = user.Id });
        }

        var clientOrders = new List<ClientOrder>();
        foreach (var order in orders)
        {
            var randomClient = clients[new Random().Next(clients.Count)];
            clientOrders.Add(new ClientOrder { ClientId = randomClient.Id, OrderId = order.Id });
        }

        var userOrders = new List<UserOrders>();
        foreach (var order in orders)
        {
            var randomUser = users[new Random().Next(users.Count)];
            userOrders.Add(new UserOrders { UserId = randomUser.Id, OrderId = order.Id });
        }

        var userTasks = new List<UserTask>();
        foreach (var task in tasks)
        {
            var randomUser = users[new Random().Next(users.Count)];
            userTasks.Add(new UserTask { UserId = randomUser.Id, TaskId = task.Id });
        }
        
        
        _context.ClientUser.AddRange(clientUsers);
        _context.UserOrders.AddRange(userOrders);
        _context.UserTasks.AddRange(userTasks);
        _context.ClientOrders.AddRange(clientOrders);
        _context.SaveChanges();
    }
}
