import React, { useEffect, useState } from "react";
import { Outlet, useNavigate,Navigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import UserProfile from "./UserProfile";
import Auth from "./Auth"
import { useSelector, useDispatch } from "react-redux";
import AdminDashboard from "./AdminSidePages/AdminDashboard";

export default function ProtecteedRoute() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticate =true//useSelector((state) => state.user.isAuthenticate);
  const userType=2
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  return !isAuthenticate?<Navigate to={"login"}/>:<Outlet/>

//     <div className="homepage">
      
//     </div>
//   ) : (
    
//   )
}
