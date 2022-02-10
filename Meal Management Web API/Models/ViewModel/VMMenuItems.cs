using Meal_Management_Web_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VMMenuItems
    {
        public DateTime CT { get; set; }
        public int CompanyInfoId { get; set; }
        public IEnumerable<MenuItemWithFoodItemId> MenuItems { get; set; }
    }
}
