using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class Meal:BaseEntity
    {
        public int MealType { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime ExpireTime { get; set; }
        [ForeignKey("CompanyInfo")]
        public int? CompanyInfoId { get; set; }
        public virtual CompanyInfo CompanyInfo { get; set; }
        [ForeignKey("Menu")]
        public int MenuId { get; set; }
        public virtual Menu Menu { get; set; }
    }
}
