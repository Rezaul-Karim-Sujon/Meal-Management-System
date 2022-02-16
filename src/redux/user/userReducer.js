import { LOGIN, LOGOUT } from "./userActionTypes"

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
                user:action.payloads,
                errorMessage:""
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