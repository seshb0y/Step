using LibraryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryAPI.Data.Config;

public class GenreAuthorConfig : IEntityTypeConfiguration<GenreAuthor>
{
    public void Configure(EntityTypeBuilder<GenreAuthor> builder)
    {
        builder.ToTable("GenreAuthor");
        builder.HasKey(x => new { x.GenreId, x.AuthorId });
        
        builder.HasOne(x => x.Author)
            .WithMany(x => x.GenreAuthor)
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Genre)
            .WithMany(x => x.GenreAuthor)
            .HasForeignKey(x => x.GenreId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}