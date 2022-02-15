import {UPDATE_MENU_LIST} from "./menuActionTypes"

const initialState={
    menuList:[]
}

const menuListReducer = (state = initialState,action)=>{
    switch(action.type){
        case UPDATE_MENU_LIST:
            return{
                ...state,
                menuList:action.payloads
            }   
        default:return state    
    }
}

export default menuListReducer