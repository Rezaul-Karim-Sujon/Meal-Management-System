namespace Meal_Management_Web_API.Models.ViewModel
{
    public class MenuItemWithFoodItemId
    {
        public int FoodItemId { get; set; }
        public bool IsDefault { get; set; }
        public int GroupId { get; set; }
        public bool FixedItem { get; set; }
    }
}