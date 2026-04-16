//NAZAERTH DUBÓN

using HospitalWebAPI.Data;
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalWebAPI.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        private readonly HospitalContext _context;
        public MedicoRepository(HospitalContext context)
        {
            _context = context;
        }

        public List<Medico> GetAll()
        {
            return _context.Medicos.ToList();
        }

        public Medico GetById(int id)
        {
            return _context.Medicos.Find(id);
        }

        public void Add(Medico medico)
        {
            _context.Medicos.Add(medico);
            _context.SaveChanges();
        }

        public void Update(Medico medico)
        {
            var existingMedico = _context.Medicos.Find(medico.Id);

            if (existingMedico != null)
            {
                existingMedico.Nombre = medico.Nombre;
                existingMedico.Apellido = medico.Apellido;
                existingMedico.EspecialidadId = medico.EspecialidadId;
                existingMedico.Telefono = medico.Telefono;
                existingMedico.Activo = medico.Activo;

                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var medico = _context.Medicos.Find(id);
            if (medico != null)
            {
                medico.Activo = false;
                _context.SaveChanges();
            }
        }
    }
}