//NAZARETH DUBÓN 

using HospitalWebAPI.Models;
using HospitalWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicosController: ControllerBase
    {
        private readonly MedicoService _service;
        public MedicosController(MedicoService service)
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
            var medico = _service.GetById(id);
            if (medico == null)
                return NotFound();
            return Ok(medico); 
        }

        [HttpPost] 
        public IActionResult Create([FromBody] Medico medico)
        {
            _service.Create(medico); 
            return Ok(medico); 
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Medico medico)
        {
            if (id != medico.Id) 
               return BadRequest();
               _service.Update(medico); 
               return Ok(medico);
        }

        [HttpDelete("{id}")] 
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok(); 
        }

    }

}
