import { LOGIN} from "./userActionTypes"
export const userLoginAction = (userObj)=>{
    return{
        type:LOGIN,
        payload:userObj
    }
}
