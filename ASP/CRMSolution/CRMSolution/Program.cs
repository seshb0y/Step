using System.Reflection;
using CRMSolution.Contexts;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddFluentValidation(fv => 
        fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Run();
