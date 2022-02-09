import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import fooditemsReducer from "./foodItems/foodItemsReducer";
import menuListReducer from "./menu/menuListReducer"


const rootReducer = combineReducers({
    user:userReducer,
    foodItems:fooditemsReducer,
    menuList:menuListReducer
}
)

export default rootReducer