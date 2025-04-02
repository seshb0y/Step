using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class UserOrderConfig : IEntityTypeConfiguration<UserOrders>
{
    public void Configure(EntityTypeBuilder<UserOrders> builder)
    {
        builder.ToTable("UserOrders");

        builder.HasKey(uo => new { uo.UserId, uo.OrderId });

        builder.HasOne(uo => uo.User)
            .WithMany(u => u.UserOrders)
            .HasForeignKey(uo => uo.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(uo => uo.Order)
            .WithMany(o => o.UserOrders)
            .HasForeignKey(uo => uo.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}