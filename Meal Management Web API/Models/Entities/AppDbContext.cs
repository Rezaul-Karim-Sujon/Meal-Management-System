using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meal_Management_Web_API.Models.Entities
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {}
        public DbSet<CompanyInfo> CompanyInfos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<FoodCategory> FoodCategories { get; set; }
        public DbSet<PresentEmployee> PresentEmployees { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Response> Responses { get; set; }
    }
}
