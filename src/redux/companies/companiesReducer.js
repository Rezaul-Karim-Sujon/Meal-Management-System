import {UPDATE_COMPANIES} from "./companiesActionTypes"

const initialState={
    companies:[]
}

const companiesReducer = (state = initialState,action)=>{
    switch(action.type){
        case UPDATE_COMPANIES:
            return{
                ...state,
                foodItems:action.payloads
            }   
        default:return state    
    }
}

export default companiesReducer 