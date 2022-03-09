using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Meal_Management_Web_API.Models.Entities;
using Meal_Management_Web_API.Models.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Meal_Management_Web_API.Models.Others;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Meal_Management_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UsersController(AppDbContext context, IJwtAuthenticationManager jwtAuthenticationManager, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _webHostEnvironment = webHostEnvironment; 
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .AsNoTracking()
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new ResponseModel {
                    Success = false,
                    Message = "User not found"
                });
            }

            return Ok(new ResponseModel {
                Success = true,
                Data=user
            });
        }
        
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromForm]VmRegistration filter)
        {
            if (id != filter.Id)
            {
                return BadRequest(new ResponseModel {
                    Success=false,
                    Message="Access Denied",
                    Details="Id and User Id don't match",
                });
            }
            var result = await _context
                .Users
                .AsNoTracking()
                .SingleOrDefaultAsync(e=>e.Id==id);
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.UserImagePath.NoTilde())+ result.Picture;
            if (path != null && System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            string PicturePath = UploadFileControl.FileName(filter.Picture,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.UserImagePath.NoTilde()));
            var user = new User
            {
                Id = id,
                Name = filter.Name,
                Email = filter.Email,
                Phone = filter.Phone,
                Active = filter.Active,
                UserType = filter.UserType,
                Picture = PicturePath,
                Password = filter.Password,
                CompanyId = filter.CompanyId,
                Address=filter.Address,
                About=filter.About
            };
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new ResponseModel {
                        Success=false,
                        Message="User Not Found"
                    });
                }
                else
                {
                    throw;
                }
            }
            return Ok(new ResponseModel {
                Success = true,
                Message = "Edit Successful",
                Details = "User details edit successful",
                Data = user
            });
        }
        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromForm]VmRegistration filter)
        {
            string PicturePath = UploadFileControl.FileName(filter.Picture,
                string.Concat(_webHostEnvironment.WebRootPath, Constant.UserImagePath.NoTilde()));
            var result = new User
            {
                Name = filter.Name,
                Email = filter.Email,
                Phone = filter.Phone,
                Active = filter.Active,
                UserType = filter.UserType,
                Picture = PicturePath,
                Password = filter.Password,
                CompanyId = filter.CompanyId,
                Address=filter.Address,
                About=filter.About
            };
            _context.Users.Add(result);
            await _context.SaveChangesAsync();
            return Ok(new ResponseModel {
                Success=true,
                Message= "User Create Successful"
            });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new ResponseModel {
                    Success=false,
                    Message="User Not found"
                });
            }
            string path = string.Concat(_webHostEnvironment.WebRootPath, Constant.UserImagePath.NoTilde()) + user.Picture;
            if(System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new ResponseModel {
                Success=true,
                Message="User Successfully Deleted"
            });
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        //POST: /api/Users/Login
        public async Task<ActionResult>Login(VMLogin filter)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x=>x.Name==filter.Name || x.Email==filter.Name);
            if (user == null) return BadRequest(new ResponseModel{
                Success =false,
                Message = "Invalid Credentials"
            });
            if (filter.Password != user.Password)
            {
                return BadRequest(new ResponseModel{
                    Success = false,
                    Message = "Wrong Password"
                });
            }
            string Token= _jwtAuthenticationManager.Authenticate(user);
            return Ok(new ResponseModel{
                Success = true,
                Message = "Log In Successful",
                Details= Token,
                Data=user 
            });
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
