namespace LibraryAPI.Data.Models;

public class Authors
{
   public Guid AuthorId { get; set; } = Guid.NewGuid();
   
   public string FullName { get; set; }
   
   public ICollection<Books> Books { get; set; } = new List<Books>();
   // public ICollection<Genres> Genres  { get; set; } = new List<Genres>();
   // public ICollection<AuthorBook> AuthorBooks { get; set; } = new List<AuthorBook>();
   public ICollection<GenreAuthor> GenreAuthor { get; set; } = new List<GenreAuthor>();
}