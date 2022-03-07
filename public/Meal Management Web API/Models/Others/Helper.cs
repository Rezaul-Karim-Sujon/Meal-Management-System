using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Others
{
    public static class Helper
    {
        public static string NoTilde(this string str)
        {
            return str.Replace("~", "");
        }
    }
}
