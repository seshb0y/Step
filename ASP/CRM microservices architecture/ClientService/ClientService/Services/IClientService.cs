using ClientService.Data.Models;
using ClientService.DTO.Requests.Client;
using ClientService.DTO.Responses;
using CRMSolution.DTO.Requests.Client;
using CRMSolution.Grpc.Client;

namespace ClientService.Services.Interfaces;

public interface IClientService
{
    public Task<DefaultClientResponse> CreateClient(CreateClientRequest request);
    public Task<DefaultClientResponse> ChangeDataClient(ChangeDataClientRequest request);
    public Task DeleteClient(DeleteClientRequest request);
    public Task<GetClientResponse> FindClient(GetClientByEmailRequest request);
    public Task<GetAllClientsResponse> GetAllClients(GetAllClientsRequest getAllClientsRequest);
    // Task<List<ClientWithOrdersAndTasksResponse>> GetClientsWithOrdersAndTasks(HttpContext httpContext);
    Task<Client> GetByEmailAsync(GetClientByEmailRequest request);
    Task<Client> GetByIdAsync(GetClientByIdRequest request);
    Task<GetClientsByIdsResponse> GetClientsByIds(GetClientsByIdsRequest request);
    Task<GetClientsWithOrdersAndTasksResponse> GetClientsWithOrdersAndTasksAsync(string request);
    Task<GetDashboardDataResponse> GetDashboardData(GetDashboardDataRequest request);
}