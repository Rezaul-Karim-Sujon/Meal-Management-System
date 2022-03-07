using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Meal_Management_Web_API.Models.Others;

namespace Meal_Management_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MealsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Meals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meal>>> GetMeals()
        {
            return await _context.Meals
                .AsNoTracking()
                .Include(e=>e.Menu)
                .Include(e=>e.CompanyInfo)
                .ToListAsync();
        }

        // GET: api/Meals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);

            if (meal == null)
            {
                return NotFound(new ResponseModel
                {
                    Success = false,
                    Message = "Meal not found"
                });
            }

            return Ok(new ResponseModel
            {
                Success = true,
                Data = meal
            });
        }

        // PUT: api/Meals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(int id, Meal meal)
        {
            if (id != meal.Id)
            {
                return BadRequest(new ResponseModel
                {
                    Success = false,
                    Message = "Access Denied",
                    Details = "Id and meal Id don't match",
                });
            }

            _context.Entry(meal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealExists(id))
                {
                    return NotFound(new ResponseModel
                    {
                        Success = false,
                        Message = "Meal Not found"
                    });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new ResponseModel
            {
                Success = true,
                Message = "Edit Successful",
                Details = "Meal details edit successful",
                Data = meal
            });
        }

        // POST: api/Meals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Meal>> PostMeal(Meal meal)
        {
            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();
            var mealId = _context.Meals.Max(e => e.Id);
            var Info=_context.Meals
                .Include(e=>e.Menu)
                .Include(e => e.CompanyInfo)
                .Where(x=>x.Id==mealId)
                .AsNoTracking();
            return Ok(Info);
        }

        // DELETE: api/Meals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Meal>> DeleteMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();

            return Ok(new ResponseModel
            {
                Success = true,
                Message = "Delete Successful"
            });
        }

        private bool MealExists(int id)
        {
            return _context.Meals.Any(e => e.Id == id);
        }
    }
}
