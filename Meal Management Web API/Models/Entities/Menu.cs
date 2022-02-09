using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class Menu: BaseEntity
    {
        public DateTime CT { get; set; }
        [ForeignKey("CompanyInfo")]
        public int? CompanyInfoId { get; set; }
        public virtual CompanyInfo CompanyInfo { get; set; }
        public virtual IEnumerable<MenuItem> MenuItems { get; set; }
        public virtual IEnumerable<Meal> Meals { get; set; }
    }
}
