using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class ClientOrderConfig : IEntityTypeConfiguration<ClientOrder>
{
    public void Configure(EntityTypeBuilder<ClientOrder> builder)
    {
        builder.ToTable("ClientOrder");

        builder.HasKey(cu => new { cu.ClientId, cu.OrderId });

        builder.HasOne(cu => cu.Client)
            .WithMany(c => c.ClientOrders)
            .HasForeignKey(cu => cu.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cu => cu.Order)
            .WithMany(u => u.ClientOrders)
            .HasForeignKey(cu => cu.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}