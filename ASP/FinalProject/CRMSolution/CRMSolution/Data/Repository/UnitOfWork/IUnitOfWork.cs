using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using CRMSolution.Data.Repository.TasksRep;
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Data.Repository;

public interface IUnitOfWork
{
    IClientRep ClientRep { get; }
    IOrderRep OrderRep { get; }
    IUserRep UserRep { get; }
    ITasksRep TasksRep { get; }
    
    Task<int> SaveChangesAsync();
}