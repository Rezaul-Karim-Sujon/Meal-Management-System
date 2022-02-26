using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.ViewModel
{
    public class VMCompanyInfo:VmBaseEntity
    {
        public string Name { get; set; }
        public IFormFile Logo { get; set; }
    }
}
