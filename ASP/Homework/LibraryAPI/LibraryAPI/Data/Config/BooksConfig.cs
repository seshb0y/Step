using LibraryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryAPI.Data.Config;

public class BooksConfig : IEntityTypeConfiguration<Books>
{
    public void Configure(EntityTypeBuilder<Books> builder)
    {
        builder.ToTable("Books");
        builder.HasKey(x => x.BookId);
        
        builder.Property(x => x.Name)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(x => x.PublicationDate)
            .HasMaxLength(10)
            .IsRequired();
    }
}