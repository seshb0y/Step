using System.Text;
using LibraryAPI.Data.Context;
using LibraryAPI.Data.Mapping;
using LibraryAPI.Services.Classes;
using LibraryAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy =>
    {
        policy.RequireRole("AppAdmin");

        options.AddPolicy("UserPolicy", policy =>
            policy.RequireRole("AppUser", "AppAdmin"));
    });
});

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

app.UseAuthorization();

app.Run();  