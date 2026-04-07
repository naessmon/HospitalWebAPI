//NAZARETH DUBÓN

using HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;
namespace HospitalWebAPI.Services
{
    public class MedicoService
    {
        private readonly IMedicoRepository _repository;
        public MedicoService(IMedicoRepository repository)
        {
            _repository = repository;
        }
        public List<Medico> GetAll()
        {
            return _repository.GetAll();
        }
        public Medico GetById(int id)
        {
            return _repository.GetById(id); 
        }
        public void Create(Medico medico)
        {
            medico.Activo = true;
            medico.FechaCreacion = DateTime.Now;
            _repository.Add(medico); 
        }
        public void Update(Medico medico) 
        {
            _repository.Update(medico); 
        }
        public void Delete(int id)
        {
            _repository.Delete(id); 
        }
    }
}
