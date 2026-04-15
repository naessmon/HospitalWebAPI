//Leonel Contreras-20191900210
using HospitalWebAPI.Data;
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace HospitalWebAPI.Repositories 
{
    public class CitaRepository : ICitaRepository
    {
        private readonly HospitalContext _context;
        public CitaRepository(HospitalContext context)
        {
            _context = context;
        }
        public List<Cita> GetAll()
        {
            return _context.Citas.ToList(); }
        public Cita GetById(int id)
        { return _context.Citas.Find(id); }
        public void Add(Cita cita)
        { _context.Citas.Add(cita); _context.SaveChanges(); }

        public void Update(Cita cita)
        {
            var existingCita = _context.Citas.Find(cita.Id);

            if (existingCita != null)
            {
                existingCita.PacienteId = cita.PacienteId;
                existingCita.MedicoId = cita.MedicoId;
                existingCita.FechaHora = cita.FechaHora;
                existingCita.Motivo = cita.Motivo;
                existingCita.Estado = cita.Estado;
                existingCita.Activo = cita.Activo;

                _context.SaveChanges();
            }
        }
        public void Delete(int id) 
        { var cita = _context.Citas.Find(id); if (cita != null) 
            { cita.Activo = false; _context.SaveChanges(); } }
    }
}