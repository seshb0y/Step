using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class ClientService : IClientService
{
    private readonly IRepository<Client> _clientRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<ClientService> _logger;
    
    public ClientService(IRepository<Client> clientRepository, IMapper mapper, ILogger<ClientService> logger)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
        _logger = logger;
    }
    
    public Task CreateClient(CreateClientRequest request)
    {
        _logger.LogInformation("Создаем нового клиента: {@Request}", request);
        Client client = _mapper.Map<Client>(request);
        return _clientRepository.AddAsync(client);
    }

    public async Task ChangeDataClient(ChangeDataClientRequest request)
    {
        _logger.LogInformation("Изменяем данные клиента: {@Request}", request);
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        client = _mapper.Map<Client>(request);
        _clientRepository.Update(client);
        await _clientRepository.SaveChangesAsync();
    }
    
    public async Task DeleteClient(DeleteClientRequest request)
    {
        _logger.LogInformation("Удаляем клиента: {@Request}", request);
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        _clientRepository.Delete(client);
        await _clientRepository.SaveChangesAsync();
    }

    public async Task<Client> FindClient(FindClientRequest request)
    {
        _logger.LogInformation("Поиск клиента: {@Request}", request);
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        return client;
    }
}