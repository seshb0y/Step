using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class ClientUserConfig : IEntityTypeConfiguration<ClientUser>
{
    public void Configure(EntityTypeBuilder<ClientUser> builder)
    {
        builder.ToTable("ClientUsers");

        builder.HasKey(cu => new { cu.ClientId, cu.UserId });

        builder.HasOne(cu => cu.Client)
            .WithMany(c => c.ClientUsers)
            .HasForeignKey(cu => cu.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cu => cu.User)
            .WithMany(u => u.ClientUsers)
            .HasForeignKey(cu => cu.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}