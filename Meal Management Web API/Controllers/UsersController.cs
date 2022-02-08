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

namespace Meal_Management_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;

        public UsersController(AppDbContext context, IJwtAuthenticationManager jwtAuthenticationManager)
        {
            _context = context;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        
        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(VmRegistration filter)
        {
            var result = new User
            {
                Name = filter.Name,
                Email = filter.Email,
                Phone = filter.Phone,
                Active = filter.Active,
                UserType = 0,
                Picture = filter.Picture,
                Password = filter.Password,
                CompanyId = filter.CompanyId
            };
            _context.Users.Add(result);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        //POST: /api/Users/Login
        public async Task<ActionResult>Login(VMLogin filter)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.Name==filter.Name || x.Email==filter.Name);
            if (user == null) return BadRequest(new { message = "Invalid Credentials" });
            if (filter.Password != user.Password)
            {
                return BadRequest(new { message = "Wrong Password" });
            }
            string Token= _jwtAuthenticationManager.Authenticate(user);
            return Ok(new { Token, user });
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
