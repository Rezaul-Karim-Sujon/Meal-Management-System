using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class User:BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Active { get; set; }
        public string Picture { get; set; }
        public int UserType { get; set; }
        public string Password { get; set; }

        public int CompanyId { get; set; }
        public virtual PresentEmployee PresentEmployee { get; set; }
        public virtual CompanyInfo Company { get; set; }
    }
}
