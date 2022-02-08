using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class Menu: BaseEntity
    {
        [ForeignKey("FoodItem")]
        public int FoodItemId { get; set; }
        public bool IsDefault { get; set; }
        public int GroupId { get; set; }
        public bool FixedItem { get; set; }
        public virtual FoodItem FoodItems { get; set; }
        [NotMapped]
        public virtual IEnumerable<Meal> Meals { get; set; }
    }
}
