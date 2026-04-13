//NAZARETH DUBÓN

using HospitalWebAPI.Models;

namespace HospitalWebAPI.Interfaces 
{ 
    public interface IMedicoRepository 
    {
        List<Medico> GetAll(); 
        Medico GetById(int id);
        void Add(Medico medico); 
        void Update(Medico medico); 
        void Delete(int id); 
    }
}