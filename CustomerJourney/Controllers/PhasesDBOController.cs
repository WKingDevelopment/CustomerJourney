using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerJourney.Models;
using CustomerJourney.ModelsDBO;
using CustomerJourney.Models_Client;

namespace CustomerJourney.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhasesDBOController : ControllerBase
    {
        private readonly ClientJourneyContext _context;

        public PhasesDBOController(ClientJourneyContext context)
        {
            _context = context;
        }

        // GET: api/PhasesDBOes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhasesDBO>>> GetConfigPhases()
        {
            return await _context.ConfigPhases.ToListAsync();
        }

        // GET: api/PhasesDBOes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phases>> GetPhasesDBO(int id)
        {
            var phasesDBO = await _context.ConfigPhases.FindAsync(id);

            if (phasesDBO == null)
            {
                return NotFound();
            }

            return phasesDBO.ConvertToClientObj();
        }

        // PUT: api/PhasesDBOes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhasesDBO(int id, PhasesDBO phasesDBO)
        {
            if (id != phasesDBO.CompanyId)
            {
                return BadRequest();
            }

            _context.Entry(phasesDBO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhasesDBOExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PhasesDBOes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Phases>> PostPhasesDBO(Phases phases)
        {
            PhasesDBO phasesDBO = new PhasesDBO(phases);
            _context.ConfigPhases.Add(phasesDBO);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhasesDBOExists(phasesDBO.CompanyId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhasesDBO", new { id = phasesDBO.CompanyId }, phasesDBO.ConvertToClientObj());
        }

        // DELETE: api/PhasesDBOes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Phases>> DeletePhasesDBO(int id)
        {
            var phasesDBO = await _context.ConfigPhases.FindAsync(id);
            if (phasesDBO == null)
            {
                return NotFound();
            }

            _context.ConfigPhases.Remove(phasesDBO);
            await _context.SaveChangesAsync();

            return phasesDBO.ConvertToClientObj();
        }

        private bool PhasesDBOExists(int id)
        {
            return _context.ConfigPhases.Any(e => e.CompanyId == id);
        }
    }
}
