using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Meal_Management_Web_API.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace Meal_Management_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MenuItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MenuItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            return await _context.MenuItems
                .AsNoTracking()
                .Include(e=>e.MenuItemFoodItems)
                .ThenInclude(e=>e.FoodItem)
                .Include(e=>e.Menu)
                .ThenInclude(e=>e.CompanyInfo)
                .ToListAsync();
        }

        // GET: api/MenuItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuItem>> GetMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);

            if (menuItem == null)
            {
                return NotFound();
            }

            return menuItem;
        }

        // PUT: api/MenuItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem(int id, MenuItem menuItem)
        {
            if (id != menuItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(menuItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemExists(id))
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

        // POST: api/MenuItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MenuItem>> PostMenuItem(VMMenuItems menuItem)
        {
            var menu = new Menu
            {
                CT = menuItem.CT,
                CompanyInfoId = menuItem.CompanyInfoId
            };
            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();
            var menuId = _context.Menus.Max(e => e.Id);
            foreach(var item in menuItem.MenuItems)
            {
                var NewMenuItem = new MenuItem
                {
                    MenuId = menuId,
                    IsDefault = item.IsDefault,
                    GroupId = item.GroupId,
                    FixedItem = item.FixedItem
                };
                _context.MenuItems.Add(NewMenuItem);
                await _context.SaveChangesAsync();
                var NewFoodItems = _context.FoodItems.Find(item.FoodItemId);
                var NewMenuItemFoodItems = new MenuItemFoodItems
                {
                    FoodItem = NewFoodItems,
                    MenuItem = NewMenuItem
                };
                _context.MenuItemFoodItems.Add(NewMenuItemFoodItems);
                await _context.SaveChangesAsync();
            }
            var Info = _context.MenuItems
                .AsNoTracking()
                .Include(e => e.MenuItemFoodItems)
                .ThenInclude(e => e.FoodItem)
                .Include(e => e.Menu)
                .ThenInclude(e => e.CompanyInfo)
                .Where(x => x.MenuId == menuId);
            return Ok(Info);
            //return CreatedAtAction("GetMenuItem", new { id = menuItem.Id }, menuItem);
        }

        // DELETE: api/MenuItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MenuItem>> DeleteMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();

            return menuItem;
        }

        private bool MenuItemExists(int id)
        {
            return _context.MenuItems.Any(e => e.Id == id);
        }
    }
}
