namespace LibraryAPI.Data.Models;

public class Genres
{
    public Guid GenreId { get; set; } = Guid.NewGuid();
   
    public string Name { get; set; }
   
    public ICollection<Authors> Authors { get; set; } = new List<Authors>();
    public ICollection<Books> Books { get; set; } = new List<Books>();
    public ICollection<BookGenre> BookGenres { get; set; } = new List<BookGenre>();
    public ICollection<GenreAuthor> GenreAuthor { get; set; } = new List<GenreAuthor>();
}