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
    
    public ClientService(IUnitOfWork clientRepository, IMapper mapper, ILogger<ClientService> logger)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
        _logger = logger;
    }
    
    public async Task CreateClient(CreateClientRequest request)
    {
        _logger.LogInformation("Создаем нового клиента: {@Request}", request);
        Client client = _mapper.Map<Client>(request);
        await _clientRepository.ClientRep.AddAsync(client);
        await _clientRepository.SaveChangesAsync();
    }

    public async Task ChangeDataClient(ChangeDataClientRequest request)
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
    }

    public async Task<Client> FindClient(FindClientRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        Client? client = await _clientRepository.ClientRep.GetClientByEmail(request.email);
        if (client == null)
        {
            _logger.LogWarning("Клиент с email {Email} не найден", request.email);
            throw new KeyNotFoundException($"Client with email {request.email} not found");
        }
        _logger.LogInformation("Клиент найден: {ClientId}", client.Id);
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

}