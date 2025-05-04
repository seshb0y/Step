using CRMSolution.Data.Models;

namespace ApiGateway.DTO.Responses;

public class GetAllClientsResponse
{
    public List<Client> Clients { get; set; }
}