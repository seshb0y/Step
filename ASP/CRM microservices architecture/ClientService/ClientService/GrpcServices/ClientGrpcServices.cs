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

    public override async Task<GetClientByIdResponse> GetClientById(GetClientByIdRequest request, ServerCallContext context)
    {
        var client = await _clientService.GetByIdAsync(request.Id);

        return new GetClientByIdResponse
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