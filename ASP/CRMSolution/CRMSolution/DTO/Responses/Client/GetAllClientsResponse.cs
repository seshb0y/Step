using CRMSolution.Data.Models;

namespace ControllerFirst.DTO.Responses;

public class GetAllClientsResponse
{
    public List<Client> Clients { get; set; }
}