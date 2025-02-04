using LibraryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryAPI.Data.Config;

public class AuthorsConfig : IEntityTypeConfiguration<Authors>
{
    public void Configure(EntityTypeBuilder<Authors> builder)
    {
        builder.ToTable("Authors");
        builder.HasKey(x => x.AuthorId);
        
        builder.Property(x => x.FullName)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.HasMany(x => x.Books)
            .WithOne(x => x.Author)
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Genres)
            .WithMany(x => x.Authors)
            .UsingEntity<GenreAuthor>(
                x => x.HasOne(x => x.Genre)
                    .WithMany(x => x.GenreAuthor)
                    .HasForeignKey(x => x.GenreId),
                x => x.HasOne(x => x.Author)
                    .WithMany(x => x.GenreAuthor)
                    .HasForeignKey(x => x.AuthorId),
                x =>
                {
                    x.ToTable("GenreAuthor");
                    x.HasKey(x => new { x.AuthorId, x.GenreId });
                });
    }
}