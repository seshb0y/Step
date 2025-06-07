using ClientService.Data.Models;
using ClientService.Data.Repository.Interface;

namespace ClientService.Data.Repository.SpecialRepClass.ClientRep;

public interface IClientCommentsRep : IRepository<ClientsComments>
{
    Task<IEnumerable<ClientsComments?>> GetCommentsByClientId(int id);
}