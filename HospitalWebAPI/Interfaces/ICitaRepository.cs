//Leonel Contreras-20191900210
using HospitalWebAPI.Models;
namespace HospitalWebAPI.Interfaces { public interface ICitaRepository { List<Cita> GetAll(); 
        Cita GetById(int id); 
        void Add(Cita cita); 
        void Update(Cita cita); 
        void Delete(int id); } 
}