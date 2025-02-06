using AutoMapper;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services.Classes;

public class AuthorService(LibContext context, IMapper mapper) : IAuthorService
{
    private readonly LibContext _context = context;
    private readonly IMapper _mapper = mapper;
    
    public async Task AddAuthorAsync(AuthorAddRequest request)
    {
        var author = _mapper.Map<Authors>(request);
        var authorInDb = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == author.FullName);
        if (authorInDb != null)
        {
            return;
        }
        await _context.Authors.AddAsync(author);
        await _context.SaveChangesAsync();
    }

    public async Task AddBookToAuthorAsync(AuthorAddRequest request)
    {
        var book = _mapper.Map<Books>(request);
        var author = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FullName);
        author.Books.Add(book);
        var bookInDb = await _context.Books.FirstOrDefaultAsync(x => x.Name == book.Name);
        if (bookInDb == null)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            bookInDb = await _context.Books.FirstOrDefaultAsync(x => x.Name == book.Name);
        }
        bookInDb.Author.Add(author);
        
        await _context.SaveChangesAsync();
    }

    public async Task AddGenreToAuthorAsync(AuthorAddRequest request)
    {
        var genre = _mapper.Map<Genres>(request);
        var author = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FullName);
        author.Genres.Add(genre);
        var genreInDb = await _context.Genre.FirstOrDefaultAsync(x => x.Name == genre.Name);
        if (genreInDb == null)
        {
            await _context.Genre.AddAsync(genre);
            await _context.SaveChangesAsync();
            genreInDb = await _context.Genre.FirstOrDefaultAsync(x => x.Name == genre.Name);
        }
        genreInDb.Authors.Add(author);
        
        await _context.SaveChangesAsync();
    }

    public async Task AddGenreToBookAsync(AuthorAddRequest request)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        
        book.Genres.Add(genre);
        genre.Books.Add(book);
        
        await _context.SaveChangesAsync();
    }


    public async Task DeleteAuthorAsync(AuthorFindDeleteRequest request)
    {
        var match = await _context.Authors.Include(b => b.Books)
            .FirstOrDefaultAsync(x => x.FullName == request.FindByName);
        
        _context.Books.RemoveRange(match.Books);
        _context.Authors.Remove(match);
        
        await _context.SaveChangesAsync();
    }

    public bool CheckAuthorExists(AuthorFindDeleteRequest request)
    {
        var match = _context.Authors.FirstOrDefault(x => x.FullName == request.FindByName);

        if (match != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task UpdateAuthorAsync(AuthorUpdateRequest request)
    {
        var match = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FindByName);
        match.FullName = request.NewFullName;
        await _context.SaveChangesAsync();
    }

    public async Task<Authors> FindAuthorAsync(AuthorFindDeleteRequest request)
    {
        var match = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.FindByName);
        return match;
    }
}