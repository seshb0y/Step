using LibraryAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryAPI.Data.Config;

public class GenresConfig : IEntityTypeConfiguration<Genres>
{
    public void Configure(EntityTypeBuilder<Genres> builder)
    {
        builder.ToTable("Genres");
        builder.HasKey(x => x.GenreId);

        builder.Property(x => x.Name)
            .HasMaxLength(30)
            .IsRequired();
    }
}