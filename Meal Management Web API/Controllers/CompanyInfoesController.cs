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
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace Meal_Management_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyInfoesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CompanyInfoesController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
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
        public async Task<IActionResult> PutCompanyInfo(int id, [FromForm]VMCompanyInfo filter)
        {
            if (id != filter.Id)
            {
                return BadRequest();
            }
            var result = await _context
                .CompanyInfos
                .AsNoTracking()
                .SingleOrDefaultAsync(e => e.Id == id);
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.CompanyLogoPath.NoTilde()) + result.Logo;
            if (path != null && System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            string PicturePath = UploadFileControl.FileName(filter.Logo,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.CompanyLogoPath.NoTilde()));
            var companyInfo = new CompanyInfo
            {
                Id = id,
                Name=filter.Name,
                Logo=PicturePath
            };
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

            return CreatedAtAction("GetCompanyInfo", new
            {
                id = companyInfo.Id
            }, companyInfo);
        }

        // POST: api/CompanyInfoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CompanyInfo>> PostCompanyInfo([FromForm]VMCompanyInfo filter)
        {
            string PicturePath = UploadFileControl.FileName(filter.Logo,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.CompanyLogoPath.NoTilde()));
            var companyInfo = new CompanyInfo
            {
                Name = filter.Name,
                Logo = PicturePath
            };
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
                return NotFound(new ResponseModel
                {
                    Success = false,
                    Message = "Company Not found"
                });
            }
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.CompanyLogoPath.NoTilde()) + companyInfo.Logo;
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            _context.CompanyInfos.Remove(companyInfo);
            await _context.SaveChangesAsync();

            return Ok(new ResponseModel
            {
                Success = true,
                Message = "Company Successfully Deleted"
            });
        }

        private bool CompanyInfoExists(int id)
        {
            return _context.CompanyInfos.Any(e => e.Id == id);
        }
    }
}
