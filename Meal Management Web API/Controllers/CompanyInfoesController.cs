using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;

namespace Meal_Management_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyInfoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CompanyInfoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/CompanyInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyInfo>>> GetCompanyInfos()
        {
            return await _context.CompanyInfos.ToListAsync();
        }

        // GET: api/CompanyInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyInfo>> GetCompanyInfo(int id)
        {
            var companyInfo = await _context.CompanyInfos.FindAsync(id);

            if (companyInfo == null)
            {
                return NotFound();
            }

            return companyInfo;
        }

        // PUT: api/CompanyInfoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyInfo(int id, CompanyInfo companyInfo)
        {
            if (id != companyInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(companyInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyInfoExists(id))
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

        // POST: api/CompanyInfoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CompanyInfo>> PostCompanyInfo(CompanyInfo companyInfo)
        {
            _context.CompanyInfos.Add(companyInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompanyInfo", new { id = companyInfo.Id }, companyInfo);
        }

        // DELETE: api/CompanyInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompanyInfo>> DeleteCompanyInfo(int id)
        {
            var companyInfo = await _context.CompanyInfos.FindAsync(id);
            if (companyInfo == null)
            {
                return NotFound();
            }

            _context.CompanyInfos.Remove(companyInfo);
            await _context.SaveChangesAsync();

            return companyInfo;
        }

        private bool CompanyInfoExists(int id)
        {
            return _context.CompanyInfos.Any(e => e.Id == id);
        }
    }
}
