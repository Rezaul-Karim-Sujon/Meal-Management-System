using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Meal_Management_Web_API.Models.ViewModel;
using Newtonsoft.Json;

namespace Meal_Management_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MenusController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Menus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenus()
        {
            return await _context.Menus.Include(e=>e.FoodItems).ToListAsync();
        }

        // GET: api/Menus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Menu>> GetMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);

            if (menu == null)
            {
                return NotFound();
            }

            return menu;
        }

        // PUT: api/Menus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenu(int id, Menu menu)
        {
            if (id != menu.Id)
            {
                return BadRequest();
            }

            _context.Entry(menu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuExists(id))
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

        // POST: api/Menus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Menu>> PostMenu(IEnumerable<Menu> menu)
        {
            foreach (var item in menu)
            {
                Menu value = new Menu
                {
                    FoodItemId = item.FoodItemId,
                    IsDefault = item.IsDefault,
                    GroupId = item.GroupId,
                    FixedItem = item.FixedItem
                };
                _context.Add(value);
            }
            await _context.SaveChangesAsync();
            return Ok(menu);
        }

        // DELETE: api/Menus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Menu>> DeleteMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }

            _context.Menus.Remove(menu);
            await _context.SaveChangesAsync();

            return menu;
        }

        private bool MenuExists(int id)
        {
            return _context.Menus.Any(e => e.Id == id);
        }
    }
}
