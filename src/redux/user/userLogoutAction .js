import { LOGOUT} from "./userActionTypes"
export const userLogout = (userObj={})=>{
    return{
        type:LOGOUT,
        payload:userObj
    }
}
