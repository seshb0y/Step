using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class TaskConfig : IEntityTypeConfiguration<Tasks>
{
    public void Configure(EntityTypeBuilder<Tasks> builder)
    {
        builder.ToTable("Tasks");

        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
        builder.Property(t => t.Description).HasMaxLength(1000);
        builder.Property(t => t.Status).IsRequired();
        builder.Property(t => t.DueDate).IsRequired();

        builder.HasOne(t => t.Client)
            .WithMany()
            .HasForeignKey(t => t.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(t => t.AssignedTo)
            .WithMany(u => u.Tasks)
            .HasForeignKey(t => t.AssignedToId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(t => t.Order)
            .WithMany(t => t.Tasks)
            .HasForeignKey(t => t.OrderId)
            .OnDelete(DeleteBehavior.Restrict);
            
    }
}