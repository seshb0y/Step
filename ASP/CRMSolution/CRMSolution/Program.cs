using System.Reflection;
using System.Text;
using CRMSolution.Contexts;
using CRMSolution.Data.Models;
using CRMSolution.Data.Repository;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.Data.Repository.OrderResp;
using CRMSolution.Data.Repository.SpecialRepClass.ClientRep;
using CRMSolution.Data.Repository.TasksRep;
using CRMSolution.Data.Repository.UserRep;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddConsole();
    builder.AddDebug();
});
var logger = loggerFactory.CreateLogger<Program>();
builder.Services.AddSingleton(loggerFactory);
builder.Services.AddLogging();


builder.Services.AddValidatorsFromAssemblyContaining<Program>();
// builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
        policy.RequireRole(UserRole.Admin.ToString()));

    options.AddPolicy("ManagerPolicy", policy =>
        policy.RequireRole(UserRole.Manager.ToString(), UserRole.Admin.ToString()));
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IClientRep, ClientRep>();
builder.Services.AddScoped<IUserRep, UserRep>();
builder.Services.AddScoped<IOrderRep, OrderRep>();
builder.Services.AddScoped<ITasksRep, TasksRep>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ITasksService, TasksService>();
builder.Services.AddScoped<IAuthService, AuthService>(); 
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<CRMSolution.Middlewares.ExceptionHandlerMiddleware>();
app.UseHttpsRedirection();
app.Run();
