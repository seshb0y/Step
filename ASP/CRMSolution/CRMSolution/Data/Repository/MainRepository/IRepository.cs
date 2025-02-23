namespace CRMSolution.Data.Repository.Interface;

public interface IRepository<T> where T : class
{
    Task<T> GetById(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync (T entity);
    void Update (T entity);
    void Delete (T entity);
    Task SaveChangesAsync();
}