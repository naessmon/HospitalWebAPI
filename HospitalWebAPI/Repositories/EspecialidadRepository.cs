// Subida la parte de Wilhem
using HospitalWebAPI.Data;
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;

namespace HospitalWebAPI.Repositories
{
    public class EspecialidadRepository : IEspecialidadRepository
    {
        private readonly HospitalContext _context;

        public EspecialidadRepository(HospitalContext context)
        {
            _context = context;
        }

        public List<Especialidad> GetAll()
        {
            return _context.Especialidades.ToList();
        }

        public Especialidad GetById(int id)
        {
            return _context.Especialidades.Find(id);
        }

        public void Add(Especialidad especialidad)
        {
            _context.Especialidades.Add(especialidad);
            _context.SaveChanges();
        }

        public void Update(Especialidad especialidad)
        {
            _context.Especialidades.Update(especialidad);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var especialidad = _context.Especialidades.Find(id);
            if (especialidad != null)
            {
                especialidad.Activo = false;
                _context.SaveChanges();
            }
        }
    }
}