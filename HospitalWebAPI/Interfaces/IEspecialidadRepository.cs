// Subida la parte de Wilhem
using HospitalWebAPI.Models;

namespace HospitalWebAPI.Interfaces
{
    public interface IEspecialidadRepository
    {
        List<Especialidad> GetAll();
        Especialidad GetById(int id);
        void Add(Especialidad especialidad);
        void Update(Especialidad especialidad);
        void Delete(int id);
    }
}