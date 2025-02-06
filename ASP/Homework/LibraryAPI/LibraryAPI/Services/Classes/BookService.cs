using AutoMapper;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services.Classes;

public class BookService(LibContext context, IMapper mapper) : IBookService
{
    private readonly LibContext _context = context;
    private readonly IMapper _mapper = mapper;
    
    public async Task AddBookAsync(AddBookRequest request)
    {
        var book = _mapper.Map<Books>(request);
        var bookInDb = await _context.Books.FirstOrDefaultAsync(x => x.Name == book.Name);
        if (bookInDb != null)
        {
            return;
        }
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
    }

    public async Task AddBookToAuthorAsync(AddBookRequest request)
    {
        var author = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.AuthorName);
        if (author == null)
        {
            author = new Authors { FullName = request.AuthorName };
            _context.Authors.Add(author);
        }
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        author.Books.Add(book);
        book.Author.Add(author);
        
        await _context.SaveChangesAsync();
    }

    public async Task AddGenreToBookAsync(AddBookRequest request)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        var genreInDb = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        if (genreInDb == null)
        {
            genreInDb = new Genres { Name = request.GenreName };
            await _context.Genre.AddAsync(genreInDb);
            await _context.SaveChangesAsync();
        }
        if (!book.Genres.Any(g => g.GenreId == genreInDb.GenreId))
        {
            book.Genres.Add(genreInDb);
        }
        
        await _context.SaveChangesAsync();
    }

    public async Task AddGenreToAuthorAsync(AddBookRequest request)
    {
        var author = await _context.Authors
            .Include(x => x.Genres)
            .FirstOrDefaultAsync(x => x.FullName == request.AuthorName);
        var genreInDb = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        if (genreInDb == null)
        {
            genreInDb = new Genres { Name = request.GenreName };
            await _context.Genre.AddAsync(genreInDb);
            await _context.SaveChangesAsync();
        }
        if (!author.Genres.Any(g => g.GenreId == genreInDb.GenreId))
        {
            author.Genres.Add(genreInDb);
        }
        
        await _context.SaveChangesAsync();
    }

    
    
    public async Task DeleteBookAsync(FindDeleteBookRequest request)
    {
        var match = await _context.Books.Include(b => b.Author)
            .FirstOrDefaultAsync(x => x.Name == request.Title);
        
        _context.Authors.RemoveRange(match.Author);
        _context.Books.Remove(match);
        
        await _context.SaveChangesAsync();
    }

    public bool CheckBookExists(FindDeleteBookRequest request)
    {
        var match = _context.Books.FirstOrDefault(x => x.Name == request.Title);

        if (match != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task UpdateBookAsync(UpdateBookRequest request)
    {
        var match = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.FindByTitle);
        match.Name = request.NewTitle;
        match.PublicationDate = request.PublicationDate;
        match.Publisher = request.Publisher;
        await _context.SaveChangesAsync();
    }

    public async Task<Books> FindBookAsync(FindDeleteBookRequest request)
    {
        var match = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        return match;
    }
}