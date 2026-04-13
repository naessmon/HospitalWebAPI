// Subida la parte de Wilhem
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;

namespace HospitalWebAPI.Services
{
    public class EspecialidadService
    {
        private readonly IEspecialidadRepository _repository;

        public EspecialidadService(IEspecialidadRepository repository)
        {
            _repository = repository;
        }

        public List<Especialidad> GetAll()
        {
            return _repository.GetAll();
        }

        public Especialidad GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void Create(Especialidad especialidad)
        {
            especialidad.Activo = true;
            especialidad.FechaCreacion = DateTime.Now;

            _repository.Add(especialidad);
        }

        public void Update(Especialidad especialidad)
        {
            _repository.Update(especialidad);
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}