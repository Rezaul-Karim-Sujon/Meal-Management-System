import {UPDATE_MEAL_LIST} from "./mealActionTypes"

const initialState={
    mealList:[]
}

const mealListReducer = (state = initialState,action)=>{
    switch(action.type){
        case UPDATE_MEAL_LIST:
            return{
                ...state,
                mealList:action.payloads
            }   
        default:return state    
    }
}

export default mealListReducer