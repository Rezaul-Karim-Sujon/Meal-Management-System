using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class MenuItem:BaseEntity
    {
        public bool IsDefault { get; set; }
        public int GroupId { get; set; }
        public bool FixedItem { get; set; }
        [ForeignKey("Menu")]
        public int MenuId { get; set; }
        public virtual Menu Menu { get; set; }
        public virtual IEnumerable<MenuItemFoodItems> MenuItemFoodItems{ get; set; }
    }
}
