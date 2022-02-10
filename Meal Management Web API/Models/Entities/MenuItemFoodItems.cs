using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class MenuItemFoodItems:BaseEntity
    {
        public int FoodItemId { get; set; }
        public virtual FoodItem FoodItem { get; set; }
        public int MenuItemId { get; set; }
        public virtual MenuItem MenuItem { get; set; }
    }
}
