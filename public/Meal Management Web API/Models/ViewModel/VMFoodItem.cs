using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VMFoodItem:VmBaseEntity
    {
        public int FoodCategoryId { get; set; }
        public string RecipeName { get; set; }
        public IFormFile Picture { get; set; }
        public int CompanyInfoId { get; set; }
    }
}
