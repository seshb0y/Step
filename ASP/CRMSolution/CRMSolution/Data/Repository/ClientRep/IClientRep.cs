using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests.Client;

namespace CRMSolution.Data.Repository.SpecialRepClass.ClientRep;

public interface IClientRep : IRepository<Client>
{
    Task <IEnumerable<Client?>> GetClientsByManagerIdAsync(int managerId);
    Task<Client?> GetClientByEmail(String email);
    
    Task<FindClientResponse> GetClientsOrdersAndUsersAsync(string email);
    
    Task<Client?> GetClientByName(string name);
    Task<List<Client>> GetLowInfoClientsList(SortClientsRequest sortClientsRequest);

    Task<List<Order>> GetOrdersByUsername(string username);
    
    Task<List<Client>> GetClientsByOrdersAsync(List<Order> orders);


}