using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Services.Interfaces;

namespace CRMSolution.Services.Classes;

public class ClientService : IClient
{
    IRepository<Client> _clientRepository;

    public ClientService(IRepository<Client> clientRepository)
    {
        _clientRepository = clientRepository;
    }
    
    public Task CreateClient(CreateClientRequest request)
    {
        Client client = new Client{Name = request.name, Address = request.address, Email = request.email, Phone = request.phone};
        return _clientRepository.AddAsync(client);
    }

    public async Task ChangeDataClient(ChangeDataClientRequest request)
    {
        Guid guidId = Guid.Parse(request.id);
        Client client = await _clientRepository.GetById(guidId);
        
        client.Name = request.name;
        client.Address = request.address;
        client.Email = request.email;
        client.Phone = request.phone;
        
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