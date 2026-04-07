//@autor : JeniferPadilla


using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
namespace HospitalWebAPI.Services
{
    public class PacienteService
    {
        private readonly IPacienteRepository _repository;
        public PacienteService(IPacienteRepository repository)
        {
            _repository = repository;
        }
        public List<Paciente> GetAll()
        {
            return _repository.GetAll();
        }
        public Paciente GetById(int id)
        {
            return _repository.GetById(id);
        }
        public void Create(Paciente paciente)
        {
            paciente.Activo = true;
            paciente.FechaCreacion = DateTime.Now;
            _repository.Add(paciente);
        }
        public void Update(Paciente paciente)
        {
            _repository.Update(paciente);
        }
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}