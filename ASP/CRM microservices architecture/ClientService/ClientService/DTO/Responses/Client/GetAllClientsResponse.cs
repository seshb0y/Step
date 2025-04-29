using ClientService.Data.Models;

namespace ClientService.DTO.Responses;

public class GetAllClientsResponse
{
    public List<Client> Clients { get; set; }
}