using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class Response:BaseEntity
    {
        public int MealId { get; set; }
        public int UserId { get; set; }
        public int FoodItemId { get; set; }
    }
}
