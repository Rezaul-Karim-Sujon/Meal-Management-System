import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import UserProfile from "./UserProfile";
import Auth from "./Auth"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { userLoginAction } from "../redux/user/userLoginAction";


export default function Home({ token }) {
  const user = useSelector((state) => state.user.user);
  const isAuthenticate = true//useSelector((state) => state.user.isAuthenticate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  return (
    isAuthenticate?
    <>
    <Outlet/>
    </>:Navigate("login")
    
  )
}
