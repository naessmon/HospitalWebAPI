//@autor : JeniferPadilla


using HospitalWebAPI.Data;
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace HospitalWebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        private readonly HospitalContext _context;
        public PacienteRepository(HospitalContext context)
        {
            _context = context;
        }
       public List<Paciente> GetAll()
        {
            return _context.Pacientes.ToList();
        }
        public Paciente GetById(int id)
        {
            return _context.Pacientes.Find(id);
        }
        public void Add(Paciente paciente)
        {
            _context.Pacientes.Add(paciente);
            _context.SaveChanges();
        }
        public void Update(Paciente paciente)
        {
            var existingPaciente = _context.Pacientes.Find(paciente.Id);
            if (existingPaciente != null)
            {
                existingPaciente.Nombre = paciente.Nombre;
                existingPaciente.Apellido = paciente.Apellido;
                existingPaciente.FechaNacimiento = paciente.FechaNacimiento;
                existingPaciente.DNI = paciente.DNI;
                existingPaciente.Telefono = paciente.Telefono;
                existingPaciente.Activo = paciente.Activo;
                _context.SaveChanges();
            }
        }
        public void Delete(int id)
        {
            var paciente = _context.Pacientes.Find(id);
            if (paciente != null)
            {
                paciente.Activo = false;
                _context.SaveChanges();
            }
        }
    }
}
