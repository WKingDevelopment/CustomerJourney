using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerJourney.Models_DBO;
using CustomerJourney.Models_Client;
using System.Runtime.Serialization;

namespace CustomerJourney.Controllers
{
    [Route("api/Fields")]
    [ApiController]
    public class FieldsController : ControllerBase
    {
        private readonly ClientJourneyContext _context;

        public FieldsController(ClientJourneyContext context)
        {
            _context = context;
        }

        // GET: api/Fields/5
        [HttpPut("{id}")]
        // Gets all fields relating to a company, separates into main and checklist and sends down.
        public async Task<ActionResult<Fields>> GetFields(int id, Session sesh)
        {
            if (id != sesh.companyId)
            {
               return BadRequest();
            }
            var fieldsDbo = await _context.FieldsDBOs.Where(f => f.companyId == id).OrderBy(r => r.seq).ToArrayAsync();

            if (fieldsDbo == null)
            {
                return NotFound();
            }

            List<Field> mainFields = new List<Field>();
            List<Field> checklistFields = new List<Field>();

            foreach(Field f in fieldsDbo)
            {
                if (f.type == "Boolean") { checklistFields.Add(f); } else { mainFields.Add(f); };
            }
            return new Fields(mainFields.ToArray(), checklistFields.ToArray());
        }

        //// PUT: api/Fields/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutField(int id, Field fieldsDbo)
        //{
        //    if (id != fieldsDbo.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(fieldsDbo).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!FieldsDboExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Fields
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<FieldsDbo>> PostField(Field fieldsDbo)
        //{
        //    _context.FieldsDbos.Add(fieldsDbo);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetFieldsDbo", new { id = fieldsDbo.Id }, fieldsDbo);
        //}

        //// DELETE: api/Fields/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Field>> DeleteFieldsDbo(int id)
        //{
        //    var fieldsDbo = await _context.FieldsDbos.FindAsync(id);
        //    if (fieldsDbo == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.FieldsDbos.Remove(fieldsDbo);
        //    await _context.SaveChangesAsync();

        //    return fieldsDbo;
        //}

        //private bool FieldsDboExists(int id)
        //{
        //    return _context.FieldsDbos.Any(e => e.Id == id);
        //}
    }
}
