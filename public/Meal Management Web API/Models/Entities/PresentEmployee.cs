using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class PresentEmployee:BaseEntity
    {
        [ForeignKey("User")]
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public bool Breakfast { get; set; }
        public bool Lunch { get; set; }
        public bool Dinner { get; set; }

        public virtual User User { get; set; }
    }
}
