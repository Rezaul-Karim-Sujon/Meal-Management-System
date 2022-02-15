import { LOGIN_FAILED} from "./userActionTypes"
export const userLoginFailedAction = (userObj)=>{
    return{
        type:LOGIN_FAILED,
        payloads:userObj
    }
}
