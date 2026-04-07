// @author Natalie Machado
using System;

namespace HospitalWebAPI.Models
{
    public class Cita
    {
        public int Id { get; set; }
        public int PacienteId { get; set; }
        public int MedicoId { get; set; }
        public DateTime FechaHora { get; set; }
        public string Motivo { get; set; }
        public string Estado { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}