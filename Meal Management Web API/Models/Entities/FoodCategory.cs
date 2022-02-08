using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class FoodCategory:BaseEntity
    {
        public string name { get; set; }
        [NotMapped]
        public virtual IEnumerable<FoodItem> FoodItems { get; set; }
    }
}
