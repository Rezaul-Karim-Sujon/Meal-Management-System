import {UPDATE_MEAL_LIST} from "./mealActionTypes"
export const updateMealListAction = (mealList)=>{
    return{
        type:UPDATE_MEAL_LIST,
        payload:mealList
    }
}
