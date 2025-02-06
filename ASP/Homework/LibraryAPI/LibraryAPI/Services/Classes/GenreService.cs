using AutoMapper;
using LibraryAPI.Data.Context;
using AutoMapper;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services.Classes;

public class GenreService(LibContext context, IMapper mapper) : IGenreService
{
    private readonly LibContext _context = context;
    private readonly IMapper _mapper = mapper;
    
    public async Task AddGenreAsync(AddGenreRequest request)
    {
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        if (genre == null)
        {
            genre = mapper.Map<Genres>(request);
            await _context.Genre.AddAsync(genre);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddGenreToAuthorAsync(AddGenreRequest request)
    {
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        var author = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.AuthorName);
        if (author == null)
        {
            author = _mapper.Map<Authors>(request);
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
        }
        author.Genres.Add(genre);
        genre.Authors.Add(author);
        await _context.SaveChangesAsync();
    }

    public async Task AddGenreToBookAsync(AddGenreRequest request)
    {
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        if (book == null)
        {
            book = _mapper.Map<Books>(request);
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }
        book.Genres.Add(genre);
        genre.Books.Add(book);
        await _context.SaveChangesAsync();
    }

    public async Task AddBookToAuthorAsync(AddGenreRequest request)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Name == request.Title);
        var author = await _context.Authors.FirstOrDefaultAsync(x => x.FullName == request.AuthorName);
        book.Author.Add(author);
        author.Books.Add(book);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteGenreAsync(FindDeleteGenreRequest request)
    {
        var genre = await _context.Genre
            .Include(genre => genre.Authors)
            .Include(genre => genre.Books)
            .FirstOrDefaultAsync(x => x.Name == request.GenreName);
        if (genre == null)
        {
            return;
        }
        _context.Authors.RemoveRange(genre.Authors);
        _context.Books.RemoveRange(genre.Books);
        _context.Genre.Remove(genre);
        await _context.SaveChangesAsync();
    }

    public bool CheckGenreExists(FindDeleteGenreRequest request)
    {
        var match = _context.Genre.FirstOrDefault(x => x.Name == request.GenreName);

        if (match != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task UpdateGenreAsync(UpdateGenreRequest request)
    {
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.OldGenre);
        if (genre == null)
        {
            return;
        }
        genre.Name = request.NewGenre;
        await _context.SaveChangesAsync();
    }

    public async Task<Genres> FindGenreAsync(FindDeleteGenreRequest request)
    {
        var genre = await _context.Genre.FirstOrDefaultAsync(x => x.Name == request.GenreName);
        return (genre);
    }
}