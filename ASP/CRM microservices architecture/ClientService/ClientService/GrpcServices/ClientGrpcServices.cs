using ClientService.Services.Interfaces;
using CRMSolution.Grpc.Client;
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

    public override async Task<GetClientByEmailResponse> GetClientByEmail(GetClientByEmailRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC запрос на поиск клиента по Email: {Email}", request.Email);
        var client = await _clientService.GetByEmailAsync(request);

        return new GetClientByEmailResponse
        {
            Id = client.Id,
            Name = client.Name,
            Email = client.Email,
            Phone = client.Phone,
            Address = client.Address,
            CreatedAt = client.CreatedAt.ToString(),
        };

    }
}