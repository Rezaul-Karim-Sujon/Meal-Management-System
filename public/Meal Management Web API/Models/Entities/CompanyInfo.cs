using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class CompanyInfo:BaseEntity
    {
        public string Name { get; set; }
        public string Logo { get; set; }

        [NotMapped]
        public virtual IEnumerable<User> Users { get; set; }
        [NotMapped]
        public virtual IEnumerable<FoodItem> FoodItems { get; set; }
        public virtual IEnumerable<Menu> Menus { get; set; }
        [NotMapped]
        public virtual IEnumerable<Meal> Meals { get; set; }
    }
}
