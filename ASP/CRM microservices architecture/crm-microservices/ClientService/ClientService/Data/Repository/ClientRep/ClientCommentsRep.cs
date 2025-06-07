using ClientService.Data.Models;
using ClientService.Data.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Data.Repository.SpecialRepClass.ClientRep;

public class ClientCommentsRep : Repository<ClientsComments>, IClientCommentsRep
{
    public ClientCommentsRep(ClientDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<ClientsComments?>?> GetCommentsByClientId(int id)
    {
        return await _context.ClientsComments.Where(c => c.ClientId == id).ToListAsync();
    }
}