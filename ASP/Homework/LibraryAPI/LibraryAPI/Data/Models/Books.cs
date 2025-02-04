namespace LibraryAPI.Data.Models;

public class Books
{
    public Guid BookId { get; set; } = Guid.NewGuid();
   
    public string Name { get; set; }
   
    public string PublicationDate { get; set; }
    
    public string Publisher { get; set; }
    
    public Guid AuthorId { get; set; }
    public Authors? Author { get; set; }
    
    public ICollection<Genres> Genres  { get; set; } = new List<Genres>();
    public ICollection<AuthorBook> AuthorBooks { get; set; } = new List<AuthorBook>();
    public ICollection<BookGenre> BookGenres { get; set; } = new List<BookGenre>();
}