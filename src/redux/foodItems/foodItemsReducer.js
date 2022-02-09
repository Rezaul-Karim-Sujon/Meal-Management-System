import {UPDATE_FOOD_ITEMS} from "./foodItemActionTypes"

const initialState={
    foodItems:[]
}

const fooditemsReducer = (state = initialState,action)=>{
    switch(action.type){
        case UPDATE_FOOD_ITEMS:
            return{
                ...state,
                foodItems:action.payloads
            }   
        default:return state    
    }
}

export default fooditemsReducer