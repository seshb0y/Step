using System.Reflection;
using Lesson1_ControllerFirst.Contexts;
using Microsoft.EntityFrameworkCore;
// using Swashbuckle.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AuthContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("Default")
));

var app = builder.Build();

var assembly = Assembly.GetExecutingAssembly();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();
