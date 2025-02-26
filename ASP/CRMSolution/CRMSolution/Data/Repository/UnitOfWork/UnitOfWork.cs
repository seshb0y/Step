using CRMSolution.Contexts;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using CRMSolution.Data.Repository.TasksRep;
using CRMSolution.Data.Repository.UserRep;

namespace CRMSolution.Data.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly CRMContext _context;
    public IClientRep ClientRep { get; }
    public IOrderRep OrderRep { get; }
    public IUserRep UserRep { get; }
    public ITasksRep TasksRep { get; }

    public UnitOfWork(CRMContext context, IClientRep clientRep, IOrderRep orderRep, IUserRep userRep, ITasksRep tasksRep)
    {
        ClientRep = clientRep;
        OrderRep = orderRep;
        UserRep = userRep;
        TasksRep = tasksRep;
        _context = context;
    }
    
    public async Task<int> SaveChangesAsync()
    { 
        return await _context.SaveChangesAsync();
    }
}