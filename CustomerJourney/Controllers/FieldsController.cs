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
        [HttpPut("Get/{id}")]
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
                if (f.type == "Checklist") { checklistFields.Add(f); } else { mainFields.Add(f); };
            }
            return new Fields(mainFields.ToArray(), checklistFields.ToArray());
        }

        // PUT: api/Fields/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutField(int id, Fields fields)
        {
            if (id != fields.companyId)
            {
                return false;
            }

            try
            {
                _context.FieldsDBOs.RemoveRange(GetFields(id).Result);
                _context.SaveChanges();
                FieldsDBO[] fieldsDBOs = CombineFieldArrays(ConvertFieldArrays(fields.mainFields), ConvertFieldArrays(fields.checklistFields));
                _context.FieldsDBOs.AddRange(fieldsDBOs);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

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
        //    return _context.Fields.Any(e => e.Id == id);
        //}

        private async Task<FieldsDBO[]> GetFields(int id)
        {
            FieldsDBO[] fieldsDbo = await _context.FieldsDBOs.Where(f => f.companyId == id).OrderBy(r => r.seq).ToArrayAsync();
            return fieldsDbo;
        }

        private List<FieldsDBO> ConvertFieldArrays(Field[] fields)
        {
            List<FieldsDBO> fieldDBOs = new List<FieldsDBO>();
            for(int i = 0; i < fields.Length; i++)
            {
                FieldsDBO field = fields[i].ConvertToDbo();
                field.seq = i;
                fieldDBOs.Add(field);
            }
            return fieldDBOs;
        }

        private FieldsDBO[] CombineFieldArrays(List<FieldsDBO> list1, List<FieldsDBO> list2)
        {
            list1.AddRange(list2);
            return list1.ToArray();
        }
    }
}
