using ControllerFirst.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lesson1_ControllerFirst.Data.Config;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Username)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Email)
            .IsRequired();
        
        builder.Property(x => x.Password)
            .IsRequired();
        
        
        builder.HasIndex(x => x.Email)
            .HasDatabaseName("IX_Users_Email")
            .IsUnique();
        
        builder.HasIndex(x => x.Username)
            .HasDatabaseName("IX_Users_Username")
            .IsUnique();
    }
}