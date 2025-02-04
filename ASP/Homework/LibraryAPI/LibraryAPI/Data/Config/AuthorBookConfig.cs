// using LibraryAPI.Data.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace LibraryAPI.Data.Config;
//
// public class AuthorBookConfig : IEntityTypeConfiguration<AuthorBook>
// {
//     public void Configure(EntityTypeBuilder<AuthorBook> builder)
//     {
//         builder.ToTable("AuthorBooks");
//         builder.HasKey(x => new { x.AuthorId, x.BookId });
//
//         builder.HasOne(x => x.Author)
//             .WithMany(x => x.AuthorBooks)
//             .HasForeignKey(x => x.AuthorId);
//         
//         builder.HasOne(x => x.Book)
//             .WithMany(x => x.AuthorBooks)
//             .HasForeignKey(x => x.BookId);
//     }
// }