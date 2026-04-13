//Leonel Contreras-20191900210
using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
namespace HospitalWebAPI.Services
{
    public class CitaService
    {
        private readonly ICitaRepository _repository; public CitaService(ICitaRepository repository) { _repository = repository; }
        public List<Cita> GetAll() { return _repository.GetAll(); }
        public Cita GetById(int id) { return _repository.GetById(id); }
        public void Create(Cita cita) { cita.Activo = true; cita.FechaCreacion = DateTime.Now; _repository.Add(cita); }
        public void Update(Cita cita) { _repository.Update(cita); }
        public void Delete(int id) { _repository.Delete(id); }
    }
}