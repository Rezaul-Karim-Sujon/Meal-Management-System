using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Meal_Management_Web_API.Models.ViewModel;
using Meal_Management_Web_API.Models.Others;

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
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenus([FromQuery]VmBaseEntity filter)
        {
            var MenuList = _context.Menus
                .AsNoTracking();
            if (filter.UserType > 1) MenuList = MenuList.Where(e => e.CompanyInfoId == filter.CompanyId);
            var menus = MenuList
                .AsNoTracking()
                .Include(e=>e.MenuItems)
                .ThenInclude(e=>e.MenuItemFoodItems)
                .ThenInclude(e=>e.FoodItem)
                .Include(e=>e.CompanyInfo)
                .ToListAsync();
            return await menus;
        }

        // GET: api/Menus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenu(int id)
        {
            var menu = await _context.Menus
                .Where(e=>e.Id==id)
                .Include(e=>e.MenuItems)
                .ThenInclude(e=>e.MenuItemFoodItems)
                .ThenInclude(e=>e.FoodItem)
                .Include(e=>e.CompanyInfo)
                .ToListAsync();

            if (menu.Count()==0)
            {
                return NotFound(new ResponseModel
                {
                    Success = false,
                    Message = "Meals not found"
                });
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
        public async Task<ActionResult<Menu>> PostMenu(Menu menu)
        {
            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenu", new { id = menu.Id }, menu);
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
