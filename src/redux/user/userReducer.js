import { LOGIN, LOGOUT } from "./userActionTypes"
import { getToken } from "../../utils/tokenFunction"

const initialState={
    token:getToken(),
    user:{},
    isAuthenticate:false
}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                isAuthenticate:true,
                user:action.payloads.user,
                token:action.payloads.token
            }
        case LOGOUT:
            return{
                ...state,
                isAuthenticate:false,
                user:{},
                token:{}
            }    
        default:return state    
    }
}

export default userReducer