import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import fooditemsReducer from "./foodItems/foodItemsReducer";
import menuListReducer from "./menu/menuListReducer";
import mealListReducer from "./meal/mealListReducer";
import companiesReducer from "./companies/companiesReducer";


const rootReducer = combineReducers({
    user:userReducer,
    foodItems:fooditemsReducer,
    menuList:menuListReducer,
    mealList:mealListReducer,
    companies: companiesReducer
}
)

export default rootReducer