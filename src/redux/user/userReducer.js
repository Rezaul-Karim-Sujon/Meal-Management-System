import { LOGIN, LOGIN_FAILED, LOGOUT } from "./userActionTypes"

const initialState={
    user:{},
    isAuthenticate:false,
    errorMessage:""
}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                isAuthenticate:true,
                user:action.payloads.data,
                errorMessage:""
            }
        case LOGIN_FAILED:
            return{
                ...state,
                isAuthenticate:false,
                user:{},
                errorMessage:action.payloads.message
            }     
        case LOGOUT:
            return{
                ...state,
                isAuthenticate:false,
                user:{},
                errorMessage:""
            }    
        default:return state    
    }
}

export default userReducer