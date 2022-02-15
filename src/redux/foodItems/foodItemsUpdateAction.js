import {UPDATE_FOOD_ITEMS} from "./foodItemActionTypes"

export const updateFoodItemsAction = (foodItemsList)=>{
    console.log('foodItemsListfoodItemsList: ',foodItemsList)
    return{
        type:UPDATE_FOOD_ITEMS,
        payloads:foodItemsList
    }
}
