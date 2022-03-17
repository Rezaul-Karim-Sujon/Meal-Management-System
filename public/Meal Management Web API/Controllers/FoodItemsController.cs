using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Meal_Management_Web_API.Models.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Meal_Management_Web_API.Models.Others;

namespace Meal_Management_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FoodItemsController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/FoodItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems([FromForm]VmBaseEntity filter)
        {
            var foodItemList = _context.FoodItems
                .AsNoTracking();
            if (filter.UserType > 1) foodItemList = foodItemList.Where(e => e.CompanyInfoId == filter.CompanyId);
            var foodItems = foodItemList
                .AsNoTracking()
                .Include(e => e.CompanyInfo)
                .Include(e => e.FoodCategory)
                .ToListAsync();
            return await foodItems;
        }

        // GET: api/FoodItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodItem>> GetFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return foodItem;
        }

        // PUT: api/FoodItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodItem(int id, [FromForm]VMFoodItem filter)
        {
            if (id != filter.Id)
            {
                return BadRequest();
            }
            var result = await _context
                .FoodItems
                .AsNoTracking()
                .SingleOrDefaultAsync(e => e.Id == id);
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.FoodItemPicturePath.NoTilde()) + result.Picture;
            if (path != null && System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            string PicturePath = UploadFileControl.FileName(filter.Picture,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.FoodItemPicturePath.NoTilde()));
            var foodItem = new FoodItem
            {
                Id = id,
                FoodCategoryId = filter.FoodCategoryId,
                RecipeName = filter.RecipeName,
                Picture = PicturePath,
                CompanyInfoId = filter.CompanyInfoId
            };
            _context.Entry(foodItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFoodItem", new
            {
                id = foodItem.Id
            }, foodItem);
        }

        // POST: api/FoodItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FoodItem>> PostFoodItem([FromForm]VMFoodItem filter)
        {
            string PicturePath = UploadFileControl.FileName(filter.Picture,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.FoodItemPicturePath.NoTilde()));
            var foodItem = new FoodItem
            {
                FoodCategoryId = filter.FoodCategoryId,
                RecipeName = filter.RecipeName,
                Picture = PicturePath,
                CompanyInfoId = filter.CompanyInfoId
            };
            _context.FoodItems.Add(foodItem);
            await _context.SaveChangesAsync();
            var foodItemId = _context.FoodItems.Max(e => e.Id);
            var Info = _context.FoodItems
                .Include(e => e.CompanyInfo)
                .Include(e=>e.FoodCategory)
                .Where(x => x.Id == foodItemId)
                .AsNoTracking();
            return Ok(Info);
        }

        // DELETE: api/FoodItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FoodItem>> DeleteFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound();
            }
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.UserImagePath.NoTilde()) + foodItem.Picture;
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return foodItem;
        }

        private bool FoodItemExists(int id)
        {
            return _context.FoodItems.Any(e => e.Id == id);
        }
    }
}
