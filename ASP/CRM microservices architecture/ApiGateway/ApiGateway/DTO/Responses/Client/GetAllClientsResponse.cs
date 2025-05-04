using CRMSolution.Grpc.Orders;

namespace ApiGateway.DTO.Responses;

public class GetAllClientsResponse
{
    public List<ClientDto> Clients { get; set; }
}