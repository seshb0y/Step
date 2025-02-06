using LibraryAPI.Data.Models;
using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthorController : ControllerBase
{
    private readonly IAuthorService _authorService;

    public AuthorController(IAuthorService authorService)
    {
        _authorService = authorService;
    }

    
    
    [HttpPost("add-author")]
    public async Task<IActionResult> AddAuthor([FromBody] AuthorAddRequest request)
    {
        await _authorService.AddAuthorAsync(request);
        await _authorService.AddBookToAuthorAsync(request);
        await _authorService.AddGenreToAuthorAsync(request);
        await _authorService.AddGenreToBookAsync(request);
        return Ok("Author added");
    }
    
    
    

    [HttpPost("delete-author")]
    public async Task<IActionResult> DeleteAuthor([FromBody] AuthorFindDeleteRequest request)
    {
        if (_authorService.CheckAuthorExists(request))
        {
            await _authorService.DeleteAuthorAsync(request);
            return Ok("Author deleted");
        }
        return StatusCode(500, "No author was found");
    }
    
    
    

    [HttpPost("update-author")]
    public async Task<IActionResult> UpdateAuthor([FromBody] AuthorFindDeleteRequest request)
    {
        if (_authorService.CheckAuthorExists(request))
        {
            await _authorService.UpdateAuthorAsync(request);
            return Ok("Author updated");
        }
        return StatusCode(500, "No author was found");
    }
    
    

    [HttpGet("find-author")]
    public async Task<IActionResult> FindAuthor ([FromQuery] AuthorFindDeleteRequest request)
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
    
    
}