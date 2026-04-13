//@autor : JeniferPadilla


namespace HospitalWebAPI.Interfaces;
using HospitalWebAPI.Models;


    public interface IPacienteRepository
    {
        List<Paciente> GetAll();
        Paciente GetById(int id);
        void Add(Paciente paciente);
        void Update(Paciente paciente);
        void Delete(int id);
    }

