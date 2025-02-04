using System.Reflection;
using ControllerFirst.Contexts;
using ControllerFirst.Models;
using FluentValidation;
using Lesson1_ControllerFirst.Data.Mapping;
using Lesson1_ControllerFirst.Data.Validators;
using Lesson1_ControllerFirst.DTO.Requests;
using Lesson1_ControllerFirst.Services.Classes;
using Lesson1_ControllerFirst.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(ops =>
{
    ops.AddProfile<UserProfile>();
});

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IValidator<RegisterRequest>, RegisterValidator>();

builder.Services.AddDbContext<AuthContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")
));



var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();


app.Run();