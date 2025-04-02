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
using CRMSolution.Services;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using CRMSolution.Hubs;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Логирование
var loggerFactory = LoggerFactory.Create(builder => {
    builder.AddConsole();
    builder.AddDebug();
});
var logger = loggerFactory.CreateLogger<Program>();
builder.Services.AddSingleton(loggerFactory);
builder.Services.AddLogging();

// CORS
builder.Services.AddCors(policy => {
    policy.AddPolicy("Default", builder => {
        builder
            .WithOrigins("http://localhost:5173", "http://localhost:5241")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Валидация, Swagger, Accessor
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

// JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.Events = new JwtBearerEvents {
            OnMessageReceived = context => {
                var accessToken = context.Request.Cookies["accessToken"];
                if (!string.IsNullOrEmpty(accessToken)) {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

// Авторизация
builder.Services.AddAuthorization(options => {
    options.AddPolicy("AdminPolicy", policy =>
        policy.RequireRole(UserRole.Admin.ToString()));
    options.AddPolicy("ManagerPolicy", policy =>
        policy.RequireRole(UserRole.Manager.ToString(), UserRole.Admin.ToString()));
});

// Подключение к БД
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlServer(connectionString), ServiceLifetime.Scoped);

// DI
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IClientRep, ClientRep>();
builder.Services.AddScoped<IUserRep, UserRep>();
builder.Services.AddScoped<IOrderRep, OrderRep>();
builder.Services.AddScoped<ITasksRep, TasksRep>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ITwilioService, TwilioService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ITasksService, TasksService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();

// Seed
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    var seeder = services.GetRequiredService<DataSeeder>();
    seeder.Seed();
}

// Middleware pipeline
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<CRMSolution.Middlewares.ExceptionHandlerMiddleware>();

// ❗ ОБЯЗАТЕЛЬНО
app.UseRouting();

app.UseCors("Default");

app.UseAuthentication();
app.UseAuthorization();

// ❗ Используем endpoints
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapHub<NotificationHub>("/notificationHub");
});

// ❌ отключено: app.UseHttpsRedirection();
// для локальной отладки можно оставить отключенным

app.Run();
