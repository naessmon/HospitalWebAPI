// Subida la parte de Wilhem
using HospitalWebAPI.Models;
using HospitalWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EspecialidadesController : ControllerBase
    {
        private readonly EspecialidadService _service;

        public EspecialidadesController(EspecialidadService service)
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
            var especialidad = _service.GetById(id);
            if (especialidad == null)
                return NotFound();

            return Ok(especialidad);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Especialidad
especialidad)
        {
            _service.Create(especialidad);
            return Ok(especialidad);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Especialidad
especialidad)
        {
            if (id != especialidad.Id)
                return BadRequest();

            _service.Update(especialidad);
            return Ok(especialidad);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}