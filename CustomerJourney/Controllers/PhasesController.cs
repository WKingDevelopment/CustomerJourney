using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerJourney.Models_Client;
using CustomerJourney.Models_DBO;

namespace CustomerJourney.Controllers
{
    [Route("api/Phases")]
    [ApiController]
    public class PhasesController : ControllerBase
    {
        private readonly ClientJourneyContext _context;

        public PhasesController(ClientJourneyContext context)
        {
            _context = context;
        }


        // GET
        [HttpPut("Get/{id}")]
        public async Task<ActionResult<Phases>> GetPhases(int id, Session session)
        {
            if (id != session.companyId)
            {
                return BadRequest();
            }

            var phasesDBO = await _context.PhasesDbos.FindAsync(id);

            if (phasesDBO == null)
            {
                return NotFound();
            }

            return new Phases(phasesDBO.CompanyId, phasesDBO.Phases.Split('*'));
        }

        // PUT: api/PhasesDBOes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutPhases(int id, Phases phases)
        {
            if (id != phases.companyId)
            {
                return BadRequest();
            }

            _context.Entry(phases.ConvertToDbo()).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhasesDBOExists(id))
                {
                    return false;
                }
                else
                {
                    return false;
                }
            }

            return true;
        }

        // POST: api/PhasesDBOes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Phases>> PostPhasesDBO(Phases phases)
        {
            _context.PhasesDbos.Add(phases.ConvertToDbo());
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhasesDBOExists(phases.companyId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhasesDBO", new { id = phases.companyId }, phases.ConvertToDbo());
        }

        // DELETE: api/PhasesDBOes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePhasesDBO(int id)
        {
            var phasesDBO = await _context.PhasesDbos.FindAsync(id);
            if (phasesDBO == null)
            {
                return NotFound();
            }

            _context.PhasesDbos.Remove(phasesDBO);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool PhasesDBOExists(int id)
        {
            return _context.PhasesDbos.Any(e => e.CompanyId == id);
        }
    }
}
