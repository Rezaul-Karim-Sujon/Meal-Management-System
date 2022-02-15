import React from 'react'
import {
    Outlet,
    useNavigate 
  } from "react-router-dom";
import Login from './Login'  

export default function Auth() {
  return (
      <>
      <Login/>
      <Outlet/>
      </>
  )
}
