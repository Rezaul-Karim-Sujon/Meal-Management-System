import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {
    Outlet,
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Menulist from './AdminSidePages/Menulist'
import Meal from './AdminSidePages/Meal'
import FoodItems from './AdminSidePages/FoodItems'
import Accounts from './AdminSidePages/Accounts'
import SideMenu from './SideMenu';
import { useSelector, useDispatch } from 'react-redux'


export default function Home({token}) {
 const [user,setUser]= useState({})
 const user2 = useSelector(state =>state.user.user)
 const dispatch = useDispatch()

 /*
useEffect(() => {
    const config={
        headers:{
            Authorization:'Bearer '+token
        }
    }
    axios.get('user',config).then(
        res=>{
            setUser(res.data)
        },
        err=>{
            console.log(err)
        }
    )
    return () => {
        cleanup
    }
}, [input])

*/
    return (
        <>
                
        <div className='homepage'>
        <SideMenu/>
        <Outlet />
        </div>
             
        </>
    )
}
