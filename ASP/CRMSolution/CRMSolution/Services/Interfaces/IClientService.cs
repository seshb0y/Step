using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Client;

namespace CRMSolution.Services.Interfaces;

public interface IClientService
{
    public Task<Client> CreateClient(CreateClientRequest request);
    public Task<Client> ChangeDataClient(ChangeDataClientRequest request);
    public Task DeleteClient(DeleteClientRequest request);
    public Task<FindClientResponse> FindClient(FindClientRequest request);
    public Task<GetAllClientsResponse> GetAllClients(SortClientsRequest sortClientsRequest);
    Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks();

}