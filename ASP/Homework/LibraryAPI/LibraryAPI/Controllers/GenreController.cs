using LibraryAPI.DTO.Requests;
using LibraryAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenreController : ControllerBase
{
    private readonly IGenreService _genreService;
    
    public GenreController(IGenreService genreService)
    {
        _genreService = genreService;
    }
    
    [HttpPost("add-genre")]
    public async Task<IActionResult> AddGenre([FromBody] AddGenreRequest request)
    {
        await _genreService.AddGenreAsync(request);
        await _genreService.AddGenreToAuthorAsync(request);
        await _genreService.AddGenreToBookAsync(request);
        await _genreService.AddBookToAuthorAsync(request);
        
        return Ok("Genre added");
    }
    
    
    

    [HttpPost("delete-genre")]
    public async Task<IActionResult> DeleteGenre([FromBody] FindDeleteGenreRequest request)
    {
        if (_genreService.CheckGenreExists(request))
        {
            await _genreService.DeleteGenreAsync(request);
            return Ok("Genre deleted");
        }
        return StatusCode(500, "No genre was found");
    }
    
    
    
    [HttpPost("update-genre")]
    public async Task<IActionResult> UpdateGenre([FromBody] UpdateGenreRequest request, [FromQuery] FindDeleteGenreRequest FindRequest)
    {
        if (_genreService.CheckGenreExists(FindRequest))
        {
            await _genreService.UpdateGenreAsync(request);
            return Ok("Genre updated");
        }
        return StatusCode(500, "No genre was found");
    }
    
    
    

    [HttpGet("find-genre")]
    public async Task<IActionResult> FindGenre ([FromQuery] FindDeleteGenreRequest request)
    {
        if (_genreService.CheckGenreExists(request))
        {
            var book =  await _genreService.FindGenreAsync(request);
            return Ok(book);
        }
        else
        {
            return StatusCode(500, "No Genre was found");
        }
    }
}