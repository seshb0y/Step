using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Client;

namespace CRMSolution.Services.Interfaces;

public interface IClient
{
    public Task CreateClient(CreateClientRequest request);
    public Task ChangeDataClient(ChangeDataClientRequest request);
    public Task DeleteClient(DeleteClientRequest request);
    public Task<Client> FindClient(FindClientRequest request);
}