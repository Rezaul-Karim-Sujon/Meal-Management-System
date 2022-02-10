using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VMMenuList
    {
        public int MenuId { get; set; }
        public DateTime CT { get; set; }
        public IEnumerable<VMMenus> VMMenus { get; set; }
    }
}
