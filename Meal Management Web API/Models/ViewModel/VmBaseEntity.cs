using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VmBaseEntity
    {
        public int Id { get; set; }
        public int UserType { get; set; }
        public int CompanyId { get; set; }
    }
}
