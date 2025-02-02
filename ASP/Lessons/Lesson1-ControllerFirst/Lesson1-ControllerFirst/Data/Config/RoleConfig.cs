using ControllerFirst.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lesson1_ControllerFirst.Data.Config;

public class RoleConfig : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");
        builder.HasKey(x => x.RoleId);
        
        builder.Property(x => x.RoleName)
            .HasMaxLength(50)
            .IsRequired();
        
        
        builder.HasIndex(x => x.RoleName)
            .HasDatabaseName("IX_Users_Email")
            .IsUnique();
    }
}