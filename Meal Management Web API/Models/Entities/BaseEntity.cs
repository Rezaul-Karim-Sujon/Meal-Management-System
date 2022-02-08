using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
