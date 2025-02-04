using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using LibraryAPI.Data.Models;

namespace LibraryAPI.Data.Config;

public class BookGenreConfig : IEntityTypeConfiguration<BookGenre>
{
    public void Configure(EntityTypeBuilder<BookGenre> builder)
    {
        builder.ToTable("BookGenre");
        builder.HasKey(x => new { x.BookId, x.GenreId });
        
        builder.HasOne(x => x.Book)
            .WithMany(x => x.BookGenres)
            .HasForeignKey(x => x.BookId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Genre)
            .WithMany(x => x.BookGenres)
            .HasForeignKey(x => x.GenreId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}