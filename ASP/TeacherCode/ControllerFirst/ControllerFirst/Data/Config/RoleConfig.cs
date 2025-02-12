using ControllerFirst.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControllerFirst.Data.Config;

public class RoleConfig : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");
        builder.HasKey(x => x.RoleId); // primary key

        builder.Property(x => x.RoleName)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => x.RoleName)
            .HasDatabaseName("IX_Roles_RoleName")
            .IsUnique();
    }
}