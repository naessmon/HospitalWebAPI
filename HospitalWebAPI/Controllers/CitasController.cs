//Leonel Contreras-20191900210
using HospitalWebAPI.Models;
using HospitalWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
namespace HospitalWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitasController : ControllerBase
    {
        private readonly CitaService _service; public CitasController(CitaService service) { _service = service; }
        [HttpGet] public IActionResult Get() { return Ok(_service.GetAll()); }
        [HttpGet("{id}")] public IActionResult GetById(int id) { var cita = _service.GetById(id); if (cita == null) return NotFound(); return Ok(cita); }
        [HttpPost] public IActionResult Create([FromBody] Cita cita) { _service.Create(cita); return Ok(cita); }
        [HttpPut("{id}")] public IActionResult Update(int id, [FromBody] Cita cita) { if (id != cita.Id) return BadRequest(); _service.Update(cita); return Ok(cita); }
        [HttpDelete("{id}")] public IActionResult Delete(int id) { _service.Delete(id); return Ok(); }
    }
}