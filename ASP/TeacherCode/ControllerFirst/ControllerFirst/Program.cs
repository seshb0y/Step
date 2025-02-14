using System.Text;
using ControllerFirst.Contexts;
using ControllerFirst.Data.Mapping;
using ControllerFirst.Data.Validators;
using ControllerFirst.DTO.Requests;

using ControllerFirst.Services.Classes;
using ControllerFirst.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();


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

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy =>
        policy.RequireRole("AppAdmin"));

    options.AddPolicy("UserPolicy", policy =>
        policy.RequireRole("AppUser", "AppAdmin"));
});

builder.Services.AddAutoMapper(ops =>
{
    ops.AddProfile<UserProfile>();
});

builder.Services.AddScoped<IUserService, UserService>(); // IUserService a = new UserService();
builder.Services.AddScoped<ITokenService, TokenService>(); 
builder.Services.AddScoped<IValidator<RegisterRequest>,RegisterValidator>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization(); // Подключаю авторизацию

app.UseHttpsRedirection();

app.MapControllers();
app.MapScalarApiReference();
app.MapOpenApi();


app.Run();

