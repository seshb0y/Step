using ClientService.Data.Models;
using ClientService.DTO.Requests.Client;
using ClientService.DTO.Responses;
using CRMSolution.DTO.Requests.Client;

namespace ClientService.Services.Interfaces;

public interface IClientService
{
    public Task<Client> CreateClient(CreateClientRequest request);
    public Task<Client> ChangeDataClient(ChangeDataClientRequest request);
    public Task DeleteClient(DeleteClientRequest request);
    public Task<FindClientResponse> FindClient(FindClientRequest request);
    public Task<GetAllClientsResponse> GetAllClients(SortClientsRequest sortClientsRequest);
    // Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks(HttpContext httpContext);
    Task<Client> GetByIdAsync(int id);
}