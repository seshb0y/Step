using CRMSolution.Data.Models;
using CRMSolution.Data.Repository.Interface;

namespace CRMSolution.Data.Repository.SpecialRepClass.ClientRep;

public interface IClientRep : IRepository<Client>
{
    Task <IEnumerable<Client?>> GetClientsByManagerIdAsync(Guid managerId);
}