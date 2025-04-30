using ClientService.Services.Interfaces;
using CRMSolution.Grpc.Client;
using Grpc.Core;

namespace ClientService.GrpcServices;

public class ClientGrpcService : CRMSolution.Grpc.Client.ClientGrpcService.ClientGrpcServiceBase
{
    private readonly IClientService _clientService;

    public ClientGrpcService(IClientService clientService)
    {
        _clientService = clientService;
    }

    public override async Task<GetClientByEmailResponse> GetClientByEmail(GetClientByEmailRequest request, ServerCallContext context)
    {
        var client = await _clientService.GetByEmailAsync(request.Email);

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