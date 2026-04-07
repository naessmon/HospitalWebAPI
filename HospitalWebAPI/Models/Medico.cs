// @author Natalie Machado
using System;

namespace HospitalWebAPI.Models
{
    public class Medico
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int EspecialidadId { get; set; }
        public string Telefono { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}