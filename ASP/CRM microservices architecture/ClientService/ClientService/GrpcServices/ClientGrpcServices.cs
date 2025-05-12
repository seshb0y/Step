using ClientService.Services.Interfaces;
using CRMSolution.Grpc.Client;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

namespace ClientService.GrpcServices;

public class ClientGrpcService : CRMSolution.Grpc.Client.ClientGrpcService.ClientGrpcServiceBase
{
    private readonly IClientService _clientService;
    private readonly ILogger<ClientGrpcService> _logger;

    public ClientGrpcService(IClientService clientService,  ILogger<ClientGrpcService> logger)
    {
        _clientService = clientService;
        _logger = logger;
    }

    public override async Task<GetClientResponse> GetClientById(GetClientByIdRequest request, ServerCallContext context)
    {
        var client = await _clientService.GetByIdAsync(request);
        return new GetClientResponse
        {
            Id = client.Id,
            Name = client.Name,
            Email = client.Email,
            Phone = client.Phone,
            Address = client.Address,
            CreatedAt = Timestamp.FromDateTime(client.CreatedAt.ToUniversalTime())
        };
    }
    public override async Task<GetClientResponse> GetClientByEmail(GetClientByEmailRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск клиента по Email: {Email}", request.Email);
        var client = await _clientService.GetByEmailAsync(request);

        return new GetClientResponse
        {
            Id = client.Id,
            Name = client.Name,
            Email = client.Email,
            Phone = client.Phone,
            Address = client.Address,
            CreatedAt = Timestamp.FromDateTime(client.CreatedAt.ToUniversalTime())
        };

    }

    public override async Task<GetClientsByIdsResponse> GetClientsByIds(GetClientsByIdsRequest request,
        ServerCallContext context)
    {
        return await _clientService.GetClientsByIds(request);
    }

    public override async Task<DefaultClientResponse> CreateClient(CreateClientRequest request,
        ServerCallContext context)
    {
        return await _clientService.CreateClient(request);
    }

    public override async Task<DefaultClientResponse> ChangeDataClient(ChangeDataClientRequest request,
        ServerCallContext context)
    {
        return await _clientService.ChangeDataClient(request);
    }

    public override async Task<DefaultClientResponse> DeleteClient(DeleteClientRequest request,
        ServerCallContext context)
    {
        await _clientService.DeleteClient(request);
        return new DefaultClientResponse
        {
            Message = "client deleted",
            Success = true
        };
    }

    public override async Task<GetAllClientsResponse> GetAllClients(GetAllClientsRequest request,
        ServerCallContext context)
    {
        return await _clientService.GetAllClients(request);
    }

    public override async Task<GetClientsWithOrdersAndTasksResponse> GetClientsWithOrdersAndTasks(
        GetClientWithOrdersAndTasksRequest request,
        ServerCallContext context)
    {
        var token = context.RequestHeaders.FirstOrDefault(h => h.Key == "authorization").Value;
        return await _clientService.GetClientsWithOrdersAndTasksAsync(token);
    }

    public override async Task<GetDashboardDataResponse> GetDashboardData(GetDashboardDataRequest request, ServerCallContext context)
    {
        return await _clientService.GetDashboardData(request);
    }
}