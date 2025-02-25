using System.Text.Json;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MovieRazor.Pages;

public class Search : PageModel
{
    public MovieSearhByTitle? SearhByTitleRes { get; set; } = null;
    public string Title { get; set; } = string.Empty;
    
    
    public async Task OnGet(string title, int currentPage = 1)
    {
        Title = title;
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://api.themoviedb.org/3/search/movie?query={title}&include_adult=false&language=en-US&page={currentPage}"),
            Headers =
            {
                { "accept", "application/json" },
                { "Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTcxYWMxNTc3NzdkZTM3YzIxNTFjY2Q3OTQxZjU1YSIsIm5iZiI6MTY5Nzc4NDY2OS4yMDgsInN1YiI6IjY1MzIyMzVkOWFjNTM1MDg3NzU2MGEzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hFRAfYIZ3c589bcPOw8gDGN_fPWT1BZnimjUxlbYa3I" },
            },
        };
        using var response = await client.SendAsync(request);
        
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();

            SearhByTitleRes = JsonSerializer.Deserialize<MovieSearhByTitle>(body);
            
    }
}