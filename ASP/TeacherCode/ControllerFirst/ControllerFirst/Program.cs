using System.Text;
using ControllerFirst.Contexts;
using ControllerFirst.Data.Mapping;
using ControllerFirst.Data.Validators;
using ControllerFirst.DTO.Requests;
using ControllerFirst.Models;
using ControllerFirst.Services.Classes;
using ControllerFirst.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<AuthContext>();

// JWT configuration

// Ставлю по умолчанию валидацию токена по JWT
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

builder.Services.AddAutoMapper(ops =>
{
    ops.AddProfile<UserProfile>();
});

builder.Services.AddTransient<IUserService, UserService>(); // IUserService a = new UserService();
builder.Services.AddTransient<ITokenService, TokenService>(); 
builder.Services.AddTransient<IValidator<RegisterRequest>,RegisterValidator>();




var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
// app.UseAuthorization(); // Для будушего использования

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

