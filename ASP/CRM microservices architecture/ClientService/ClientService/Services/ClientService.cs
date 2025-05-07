using AutoMapper;
using ClientService.Data.Models;
using ClientService.Data.Repository.SpecialRepClass.ClientRep;
using ClientService.DTO.Requests.Client;
using ClientService.DTO.Responses;
using ClientService.Hubs;
using ClientService.Services.Interfaces;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Grpc.Client;
using CRMSolution.Grpc.Tasks;
using Google.Protobuf.WellKnownTypes;
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
    
    public async Task<DefaultClientResponse> CreateClient(CreateClientRequest request)
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
        return new DefaultClientResponse
        {
            Success = true,
            Message = "Client created"
        };
    }

    public async Task<DefaultClientResponse> ChangeDataClient(ChangeDataClientRequest request)
    {
        _logger.LogInformation("Изменяем данные клиента: {@Request}", request);
        Client client = await _clientRepository.GetClientByEmail(request.OldEmail);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.OldEmail} not found");
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
        return new DefaultClientResponse
        {
            Success = true,
            Message = "Client updated"
        };
    }
    
    public async Task DeleteClient(DeleteClientRequest request)
    {
        _logger.LogInformation("Удаляем клиента: {@Request}", request);
        Client client = await _clientRepository.GetClientByEmail(request.Email);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.Email} not found");
        }
        _clientRepository.Delete(client);
        await _hubContext.Clients.All.SendAsync("ClientDeleted", new
        {
            client.Id
        });
        await _clientRepository.SaveChangesAsync();
    }

    public async Task<GetClientResponse> FindClient(GetClientByEmailRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        HttpFindClientResponse? client = await _clientRepository.GetClientsOrdersAndUsersAsync(request.Email);
        if (client == null)
        {
            _logger.LogWarning("Клиент с email {Email} не найден",request.Email);
            throw new KeyNotFoundException($"Client with email {request.Email} not found");
        }
        _logger.LogInformation("Клиент найден: {ClientId}", request.Email);
        return _mapper.Map<GetClientResponse>(client);
    }

    public async Task<GetAllClientsResponse> GetAllClients(GetAllClientsRequest getAllClientsRequest)
    {
        var tasks = (await _clientRepository.GetAllAsync()).ToList();
        
        var grpcClient = tasks.Select(t => new ClientInfo
        {
            Id = t.Id,
            Name = t.Name,
            Email = t.Email,
            Phone = t.Phone,
            Address = t.Address,
            CreatedAt = Timestamp.FromDateTime(t.CreatedAt.ToUniversalTime()),
            OrderId = t.OrderId.Value
        }).ToList();
        
        grpcClient = getAllClientsRequest.Sort.SortBy.ToLower() switch
        {
            "id" => getAllClientsRequest.Sort.Descending
                ? grpcClient.OrderByDescending(x => x.Id).ToList()
                : grpcClient.OrderBy(x => x.Id).ToList(),

            "title" => getAllClientsRequest.Sort.Descending
                ? grpcClient.OrderByDescending(x => x.Name).ToList()
                : grpcClient.OrderBy(x => x.Name).ToList(),

            "status" => getAllClientsRequest.Sort.Descending
                ? grpcClient.OrderByDescending(x => x.Email).ToList()
                : grpcClient.OrderBy(x => x.Email).ToList(),
            
            "description" => getAllClientsRequest.Sort.Descending
                ? grpcClient.OrderByDescending(x => x.Address).ToList()
                : grpcClient.OrderBy(x => x.Address).ToList(),

            "duedate" => getAllClientsRequest.Sort.Descending
                ? grpcClient.OrderByDescending(x => x.CreatedAt.Seconds).ToList()
                : grpcClient.OrderBy(x => x.CreatedAt.Seconds).ToList(),

            _ => grpcClient
        };
        
        return new GetAllClientsResponse
        {
            Clients = { grpcClient }
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
        if (request.OrderId != 0)
        {
            client.OrderId = request.OrderId;
        }
        await _clientRepository.SaveChangesAsync();
        return client;
    }

    public async Task<Client> GetByIdAsync(GetClientByIdRequest request)
    {
        return await _clientRepository.GetById(request.ClientId);
    }

    public async Task<GetClientsByIdsResponse> GetClientsByIds(GetClientsByIdsRequest request)
    {
        var ids = request.Ids.ToList();
        
        var clients = await _clientRepository.GetClientsByIdsAsync(ids);
        var names = clients.Select(u => u.Name).ToList();

        return new GetClientsByIdsResponse
        {
            ClientName = { names }
        };
    }
}