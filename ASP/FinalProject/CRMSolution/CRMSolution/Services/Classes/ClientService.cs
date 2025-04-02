using AutoMapper;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class ClientService : IClientService
{
    private readonly IUnitOfWork _clientRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<ClientService> _logger;
    private readonly ITokenService  _tokenService;
    private readonly INotificationService _notificationService;
    
    public ClientService(IUnitOfWork clientRepository, IMapper mapper, ILogger<ClientService> logger,  ITokenService tokenService, INotificationService notificationService)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
        _logger = logger;
        _tokenService = tokenService;
        _notificationService = notificationService;
    }
    
    public async Task<Client> CreateClient(CreateClientRequest request)
    {
        _logger.LogInformation("Создаем нового клиента: {@Request}", request);
        Client client = _mapper.Map<Client>(request);
        await _clientRepository.ClientRep.AddAsync(client);
        await _clientRepository.SaveChangesAsync();

        await _notificationService.NotifyClientCreated(client);

        return await _clientRepository.ClientRep.GetClientByName(request.name);
    }

    public async Task<Client> ChangeDataClient(ChangeDataClientRequest request)
    {
        _logger.LogInformation("Изменяем данные клиента: {@Request}", request);
        Client client = await _clientRepository.ClientRep.GetClientByEmail(request.oldEmail);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.oldEmail} not found");
        }
        client = _mapper.Map(request, client);
        _clientRepository.ClientRep.Update(client);
        await _clientRepository.SaveChangesAsync();

        await _notificationService.NotifyClientUpdated(client);

        return await _clientRepository.ClientRep.GetClientByEmail(request.newEmail);
    }
    
    public async Task DeleteClient(DeleteClientRequest request)
    {
        _logger.LogInformation("Удаляем клиента: {@Request}", request);
        Client client = await _clientRepository.ClientRep.GetClientByEmail(request.email);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with email {request.email} not found");
        }
        _clientRepository.ClientRep.Delete(client);
        await _clientRepository.SaveChangesAsync();

        await _notificationService.NotifyClientDeleted(client);
    }

    public async Task<FindClientResponse> FindClient(FindClientRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        FindClientResponse? client = await _clientRepository.ClientRep.GetClientsOrdersAndUsersAsync(request.email);
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
        var clients = await _clientRepository.ClientRep.GetLowInfoClientsList(sortClientsRequest);
        return new GetAllClientsResponse
        {
            Clients = _mapper.Map<List<Client>>(clients)
        };
    }
    
    public async Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks(HttpContext httpContext)
    {
        var username = await _tokenService.GetNameFromCookies(httpContext);

        var orders = await _clientRepository.ClientRep.GetOrdersByUsername(username);
        
        orders = orders.Select(o => new Order
        {
            Id = o.Id,
            TotalAmount = o.TotalAmount,
            Status = o.Status,
            CreatedAt = o.CreatedAt,
            Tasks = o.Tasks
        }).ToList();

        var clients = await _clientRepository.ClientRep.GetClientsByOrdersAsync(orders);

        return _mapper.Map<List<ClientWithOrdersAndTasksResponse>>(clients);
    }

    public async Task UpdateClient(UpdateClientRequest request)
    {
        _logger.LogInformation("Обновляем клиента: {@Request}", request);
        var client = await _clientRepository.ClientRep.GetByIdAsync(request.Id);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {request.Id} not found");
        }

        _mapper.Map(request, client);
        _clientRepository.ClientRep.Update(client);
        await _clientRepository.SaveChangesAsync();

        await _notificationService.NotifyClientUpdated(client);
    }

    public async Task AddContact(int clientId, CreateContactRequest request)
    {
        _logger.LogInformation("Добавляем контакт для клиента: {ClientId}, {@Request}", clientId, request);
        var client = await _clientRepository.ClientRep.GetByIdAsync(clientId);
        if (client == null)
        {
            throw new KeyNotFoundException($"Client with id {clientId} not found");
        }

        var contact = _mapper.Map<Contact>(request);
        client.Contacts.Add(contact);
        _clientRepository.ClientRep.Update(client);
        await _clientRepository.SaveChangesAsync();

        await _notificationService.NotifyClientContactAdded(client, contact);
    }
}