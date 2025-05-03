using AutoMapper;
using ClientService.Data.Models;
using ClientService.Data.Repository.SpecialRepClass.ClientRep;
using ClientService.DTO.Requests.Client;
using ClientService.DTO.Responses;
using ClientService.Hubs;
using ClientService.Services.Interfaces;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Grpc.Client;
using Microsoft.AspNetCore.SignalR;

namespace ClientService.Services.Classes;

public class ClientService : IClientService
{
    private readonly IClientRep _clientRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<ClientService> _logger;
    private readonly IHubContext<NotificationHub> _hubContext;
    
    public ClientService(IClientRep clientRepository, IMapper mapper, ILogger<ClientService> logger, IHubContext<NotificationHub> hubContext)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
        _logger = logger;
        _hubContext = hubContext;
    }
    
    public async Task<Client> CreateClient(CreateClientRequest request)
    {
        _logger.LogInformation("Создаем нового клиента: {@Request}", request);
        Client client = _mapper.Map<Client>(request);
        await _clientRepository.AddAsync(client);
        await _clientRepository.SaveChangesAsync();
        _logger.LogInformation("Отправка сигнала ClientCreated");
        await _hubContext.Clients.All.SendAsync("ClientCreated", new
        {
            client.Id,
            client.Name,
            client.Email,
            client.Phone,
            client.Address
        });
        return await _clientRepository.GetClientByName(request.name);
    }

    public async Task<Client> ChangeDataClient(ChangeDataClientRequest request)
    {
        _logger.LogInformation("Изменяем данные клиента: {@Request}", request);
        Client client = await _clientRepository.GetClientByEmail(request.oldEmail);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.oldEmail} not found");
        }
        client = _mapper.Map(request, client);
        _clientRepository.Update(client);
        await _clientRepository.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("ClientUpdated", new
        {
            client.Id,
            client.Name,
            client.Email,
            client.Phone,
            client.Address
        });
        return await _clientRepository.GetClientByEmail(request.newEmail);
    }
    
    public async Task DeleteClient(DeleteClientRequest request)
    {
        _logger.LogInformation("Удаляем клиента: {@Request}", request);
        Client client = await _clientRepository.GetClientByEmail(request.email);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.email} not found");
        }
        _clientRepository.Delete(client);
        await _hubContext.Clients.All.SendAsync("ClientDeleted", new
        {
            client.Id
        });
        await _clientRepository.SaveChangesAsync();
    }

    public async Task<FindClientResponse> FindClient(FindClientRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        FindClientResponse? client = await _clientRepository.GetClientsOrdersAndUsersAsync(request.email);
        if (client == null)
        {
            _logger.LogWarning("Клиент с email {Email} не найден",request.email);
            throw new KeyNotFoundException($"Client with email {request.email} not found");
        }
        _logger.LogInformation("Клиент найден: {ClientId}", request.email);
        return client;
    }

    public async Task<GetAllClientsResponse> GetAllClients(SortClientsRequest sortClientsRequest)
    {
        var clients = await _clientRepository.GetLowInfoClientsList(sortClientsRequest);
        return new GetAllClientsResponse
        {
            Clients = _mapper.Map<List<Client>>(clients)
        };
    }
    
    // public async Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks(HttpContext httpContext)
    // {
    //     var username = await _tokenService.GetNameFromCookies(httpContext);
    //
    //     var orders = await _clientRepository.ClientRep.GetOrdersByUsername(username);
    //     
    //     orders = orders.Select(o => new Order
    //     {
    //         Id = o.Id,
    //         TotalAmount = o.TotalAmount,
    //         Status = o.Status,
    //         CreatedAt = o.CreatedAt,
    //         Tasks = o.Tasks
    //     }).ToList();
    //
    //     var clients = await _clientRepository.ClientRep.GetClientsByOrdersAsync(orders);
    //
    //     return _mapper.Map<List<ClientWithOrdersAndTasksResponse>>(clients);
    // }

    public async Task<Client> GetByEmailAsync(GetClientByEmailRequest request)
    {
        Client client = await _clientRepository.GetClientByEmail(request.Email);
        client.OrderId = request.OrderId;
        await _clientRepository.SaveChangesAsync();
        return client;
    }

}