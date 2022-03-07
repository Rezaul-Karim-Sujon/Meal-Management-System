using Meal_Management_Web_API.Models.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VmRegistration:VmBaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Active { get; set; }
        public IFormFile Picture { get; set; }
        public string Password { get; set; }
    }
}
