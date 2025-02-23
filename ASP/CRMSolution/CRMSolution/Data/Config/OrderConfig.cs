using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class OrderConfig : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");

        builder.HasKey(o => o.Id);
        builder.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        builder.Property(o => o.Status).IsRequired();
        builder.Property(o => o.CreatedAt).IsRequired();

        builder.HasOne(o => o.Client)
            .WithMany(c => c.Orders)
            .HasForeignKey(o => o.ClientId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}