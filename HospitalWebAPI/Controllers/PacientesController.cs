//@autor : JeniferPadilla

using HospitalWebAPI.Models;
using HospitalWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
namespace HospitalWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientesController : ControllerBase
    {
        private readonly PacienteService _service;
        public PacientesController(PacienteService service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var paciente = _service.GetById(id);
            if (paciente == null)
                return NotFound();
            return Ok(paciente);
        }
        [HttpPost]
        public IActionResult Create([FromBody] Paciente paciente)
        {
            _service.Create(paciente);
            return Ok(paciente);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Paciente
        paciente)
        {
            if (id != paciente.Id)
                return BadRequest();
            _service.Update(paciente);
            return Ok(paciente);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}
