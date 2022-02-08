using Meal_Management_Web_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(User user);
    }
}
