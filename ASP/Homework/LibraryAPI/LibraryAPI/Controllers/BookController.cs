using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }
    
    [HttpPost("add-book")]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> AddBook([FromBody] AddBookRequest request)
    {
        await _bookService.AddBookAsync(request);
        await _bookService.AddBookToAuthorAsync(request);
        await _bookService.AddGenreToBookAsync(request);
        await _bookService.AddGenreToAuthorAsync(request);
        
        return Ok("Book added");
    }
    
    
    

    [HttpPost("delete-book")]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> DeleteBook([FromBody] FindDeleteBookRequest request)
    {
        if (_bookService.CheckBookExists(request))
        {
            await _bookService.DeleteBookAsync(request);
            return Ok("Book deleted");
        }
        return StatusCode(500, "No book was found");
    }
    
    
    
    [HttpPost("update-book")]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> UpdateBook([FromBody] UpdateBookRequest request, [FromQuery] FindDeleteBookRequest FindRequest)
    {
        if (_bookService.CheckBookExists(FindRequest))
        {
            await _bookService.UpdateBookAsync(request);
            return Ok("Book updated");
        }
        return StatusCode(500, "No book was found");
    }
    
    
    

    [HttpGet("find-book")]
    [Authorize(Policy = "UserPolicy")]
    public async Task<IActionResult> FindBook ([FromQuery] FindDeleteBookRequest request)
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