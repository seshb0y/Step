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
}