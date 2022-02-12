using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Others
{
    public class ResponseModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
        public Object Data { get; set; }
    }
}
