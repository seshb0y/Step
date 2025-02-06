using LibraryAPI.Data.Context;
using LibraryAPI.Data.Mapping;
using LibraryAPI.Services.Classes;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddAutoMapper(ops =>
    ops.AddProfile<AuthorProfile>());
builder.Services.AddAutoMapper(ops => 
    ops.AddProfile<BookProfile>());
builder.Services.AddAutoMapper(ops => 
    ops.AddProfile<GenreProfile>());

builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IGenreService, GenreService>();

builder.Services.AddDbContext<LibContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();  