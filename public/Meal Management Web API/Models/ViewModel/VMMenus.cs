using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VMMenus
    {
        public string RecipeName { get; set; }
        public string Picture { get; set; }
        public bool IsDefault { get; set; }
        public int GroupId { get; set; }
        public bool FixedItem { get; set; }
    }
}
