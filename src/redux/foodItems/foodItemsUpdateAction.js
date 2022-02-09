import {UPDATE_FOOD_ITEMS} from "./foodItemActionTypes"
export const updateFoodItemsAction = (foodItemsList)=>{
    return{
        type:UPDATE_FOOD_ITEMS,
        payload:foodItemsList
    }
}
