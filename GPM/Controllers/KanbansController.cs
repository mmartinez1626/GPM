using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GPM.Data;
using GPM.Models;

namespace GPM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KanbansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KanbansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Kanbans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kanban>>> GetKanbans()
        {
            return await _context.Kanbans.ToListAsync();
        }

        // GET: api/Kanbans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kanban>> GetKanban(int id)
        {
            var kanban = await _context.Kanbans.FindAsync(id);

            if (kanban == null)
            {
                return NotFound();
            }

            return kanban;
        }

        // PUT: api/Kanbans/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKanban(int id, Kanban kanban)
        {
            if (id != kanban.Id)
            {
                return BadRequest();
            }

            _context.Entry(kanban).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KanbanExists(id))
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

        // POST: api/Kanbans
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Kanban>> PostKanban(Kanban kanban)
        {
            _context.Kanbans.Add(kanban);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKanban", new { id = kanban.Id }, kanban);
        }

        // DELETE: api/Kanbans/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Kanban>> DeleteKanban(int id)
        {
            var kanban = await _context.Kanbans.FindAsync(id);
            if (kanban == null)
            {
                return NotFound();
            }

            _context.Kanbans.Remove(kanban);
            await _context.SaveChangesAsync();

            return kanban;
        }

        private bool KanbanExists(int id)
        {
            return _context.Kanbans.Any(e => e.Id == id);
        }
    }
}
