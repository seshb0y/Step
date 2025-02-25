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
    public ClientService(IRepository<Client> clientRepository, IMapper mapper)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
    }
    
    public Task CreateClient(CreateClientRequest request)
    {
        Client client = _mapper.Map<Client>(request);
        return _clientRepository.AddAsync(client);
    }

    public async Task ChangeDataClient(ChangeDataClientRequest request)
    {
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        client = _mapper.Map<Client>(request);
        _clientRepository.Update(client);
        await _clientRepository.SaveChangesAsync();
    }
    
    public async Task DeleteClient(DeleteClientRequest request)
    {
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        _clientRepository.Delete(client);
        await _clientRepository.SaveChangesAsync();
    }

    public async Task<Client> FindClient(FindClientRequest request)
    {
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        return client;
    }
}