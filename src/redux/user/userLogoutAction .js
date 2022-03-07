import { LOGOUT} from "./userActionTypes"
export  const userLogoutAction = (userObj={})=>{
    return{
        type:LOGOUT,
        payloads:userObj
    }
}
