import {UPDATE_MENU_LIST} from "./menuActionTypes"
export const updateMenuListAction = (menuList)=>{
    return{
        type:UPDATE_MENU_LIST,
        payloads:menuList
    }
}
