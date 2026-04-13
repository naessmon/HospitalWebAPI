using HospitalWebAPI.Data;
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Repositories;
using HospitalWebAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<HospitalContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// PACIENTES
builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
builder.Services.AddScoped<PacienteService>();

// MEDICOS
builder.Services.AddScoped<IMedicoRepository, MedicoRepository>();
builder.Services.AddScoped<MedicoService>();

// CITAS
builder.Services.AddScoped<ICitaRepository, CitaRepository>();
builder.Services.AddScoped<CitaService>();

// ESPECIALIDADES
builder.Services.AddScoped<IEspecialidadRepository, EspecialidadRepository>();
builder.Services.AddScoped<EspecialidadService>();

// 1. Definir la política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)  // Permite cualquier origen incluyendo null (archivos locales)
              .AllowAnyHeader()   // Permite cualquier encabezado
              .AllowAnyMethod()   // Permite GET, POST, PUT, DELETE
              .AllowCredentials(); // Permite credenciales
    });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirTodo");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


