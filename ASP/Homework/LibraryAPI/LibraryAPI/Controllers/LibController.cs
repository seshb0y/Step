using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class LibController : ControllerBase
{
    private readonly IAuthorService _authorService;
    private readonly IBookService _bookService;

    public LibController(IAuthorService authorService)
    {
        _authorService = authorService;
    }

    
    
    [HttpPost("add-author")]
    public async Task<IActionResult> AddAuthor([FromBody] AuthorAddRequest request)
    {
        await _authorService.AddAuthorAsync(request);
        
        return Ok("Author added");
    }
    [HttpPost("add-book")]
    public async Task<IActionResult> AddBook([FromBody] BookRequest request)
    {
        await _bookService.AddBookAsync(request);
        
        return Ok("Book added");
    }
    
    
    

    [HttpPost("delete-author")]
    public async Task<IActionResult> DeleteAuthor([FromBody] AuthorChangeDeleteRequest request)
    {
        if (_authorService.CheckAuthorExists(request))
        {
            await _authorService.DeleteAuthorAsync(request);
            return Ok("Author deleted");
        }
        return StatusCode(500, "No author was found");
    }
    [HttpPost("delete-book")]
    public async Task<IActionResult> DeleteBook([FromBody] BookRequest request)
    {
        if (_bookService.CheckBookExists(request))
        {
            await _bookService.DeleteBookAsync(request);
            return Ok("Book deleted");
        }
        return StatusCode(500, "No book was found");
    }
    
    
    

    [HttpPost("update-author")]
    public async Task<IActionResult> UpdateAuthor([FromBody] AuthorChangeDeleteRequest request)
    {
        if (_authorService.CheckAuthorExists(request))
        {
            await _authorService.UpdateAuthorAsync(request);
            return Ok("Author updated");
        }
        return StatusCode(500, "No author was found");
    }
    [HttpPost("update-book")]
    public async Task<IActionResult> UpdateBook([FromBody] BookRequest request)
    {
        if (_bookService.CheckBookExists(request))
        {
            await _bookService.UpdateBookAsync(request);
            return Ok("Book updated");
        }
        return StatusCode(500, "No book was found");
    }
    
    
    

    [HttpGet("find-author")]
    public async Task<IActionResult> FindAuthor ([FromQuery] AuthorChangeDeleteRequest request)
    {
        if (_authorService.CheckAuthorExists(request))
        {
            var author =  await _authorService.FindAuthorAsync(request);
            return Ok(author);
        }
        else
        {
            return StatusCode(500, "No author was found");
        }
    }
    [HttpGet("find-book")]
    public async Task<IActionResult> FindBook ([FromQuery] BookRequest request)
    {
        if (_bookService.CheckBookExists(request))
        {
            var book =  await _bookService.FindBookAsync(request);
            return Ok(book);
        }
        else
        {
            return StatusCode(500, "No book was found");
        }
    }
    
    
}