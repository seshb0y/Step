using CRMSolution.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMSolution.Data.Config;

public class CallRecordingConfig : IEntityTypeConfiguration<CallRecording>
{
    public void Configure(EntityTypeBuilder<CallRecording> builder)
    {
        builder.ToTable("CallRecording");

        builder.HasKey(cr => cr.Id);
        builder.Property(cr => cr.Url)
            .IsRequired()
            .HasMaxLength(500); 

        builder.Property(cr => cr.OrderId)
            .IsRequired();

        builder.HasOne(cr => cr.Order)
            .WithMany(o => o.CallRecordings)
            .HasForeignKey(cr => cr.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}