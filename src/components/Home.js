import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import UserProfile from "./UserProfile";
import Auth from "./Auth"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { userLoginAction } from "../redux/user/userLoginAction";
import { userLoginFailedAction } from "./../redux/user/userLoginFailedAction";


export default function Home({ token }) {
  const user = useSelector((state) => state.user.user);
  const isAuthenticate = true//useSelector((state) => state.user.isAuthenticate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const config={
      Headers:{
        Authorization:localStorage.getItem('token')
      }
    }
    axios.get('http://localstorage:8000/user',config)
    .then(response=>{
      if(response.success===true){
        localStorage.setItem('token',response.details)
        dispatch(userLoginAction(response))
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },[]) 

  return (
    <>
    <Outlet/>
    </>
    
  )
}
