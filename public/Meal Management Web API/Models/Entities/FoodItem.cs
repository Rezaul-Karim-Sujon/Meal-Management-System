using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class FoodItem:BaseEntity
    {
        [ForeignKey("FoodCategory")]
        public int FoodCategoryId { get; set; }
        public string RecipeName { get; set; }
        public string Picture { get; set; }
        [ForeignKey("CompanyInfo")]
        public int CompanyInfoId { get; set; }
        public virtual CompanyInfo CompanyInfo { get; set; }
        
        public virtual FoodCategory FoodCategory { get; set; }
        [NotMapped]
        public virtual IEnumerable<MenuItemFoodItems> MenuItemFoodItems { get; set; }
    }
}
