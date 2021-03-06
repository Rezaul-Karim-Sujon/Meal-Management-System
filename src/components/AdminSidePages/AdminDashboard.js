import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";
import UserProfile from "../UserProfile";
import { useSelector, useDispatch } from "react-redux";
import {SidebarAdminData,SidebarSuperAdminData,UserData} from "../../utils/SidebarData"

export default function AdminDashboard() {
  //const isAuthenticate=useSelector((state)=>state.user.isAuthenticate);
  //const userType=useSelector((state)=>state.user.user.userType)
  const user = useSelector((state) => state.user.user);
  const [sideBarData,setSideBarData] = useState(null)
  const userType=2

  useEffect(()=>{
    const currentSideBarData = userType===1?SidebarSuperAdminData:
          userType===2?SidebarAdminData:UserData;
      setSideBarData(currentSideBarData)    
      },[sideBarData])

  return (
    <div className="homepage">
      <SideMenu sideBarData={sideBarData}/>
      <UserProfile />
      <Outlet />
    </div>)
}
