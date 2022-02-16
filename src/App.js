import "./App.css";
import {  Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Meal from "./components/AdminSidePages/Meal";
import Menulist from "./components/AdminSidePages/Menulist";
import FoodItems from "./components/AdminSidePages/FoodItems";
import Accounts from "./components/AdminSidePages/Accounts";
import CreateMenu from "./components/AdminSidePages/CreateMenu";
import CreateMeal from "./components/AdminSidePages/CreateMeal";
import AdminDashboard from "./components/AdminSidePages/AdminDashboard";
import PageNotFound from "./components/PageNotFound";
import AdminAccounts from "./components/AdminAccounts"
import Companies from "./components/Companies";
import {useSelector} from "react-redux"
import { useEffect } from "react";
import Footer from "./components/Footer"


function App() {
  const isAuthenticate=useSelector((state)=>state.user.isAuthenticate);
  const userType=useSelector((state)=>state.user.user.userType)

  useEffect(()=>{
  },[userType,isAuthenticate])
  
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}>
          {!isAuthenticate && <Route path="" element={<Login />} />}
            {!isAuthenticate && <Route path="signup" element={<SignUp />} />}
            {!isAuthenticate && <Route path="login" element={<Login />} />}
            {/* //<Route element={<ProtecteedRoute />}> */}
            
            {(isAuthenticate&& userType===2) &&
              <Route path="" element={<AdminDashboard />}>
                <Route path="" element={<Meal />} />
                <Route path="meal" element={<Meal />} />
                <Route path="menuList" element={<Menulist />} />
                <Route path="foodItems" element={<FoodItems />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="createMenu" element={<CreateMenu />} />
                <Route path="createMeal" element={<CreateMeal />} />
              </Route>
            
            }
            {(isAuthenticate&& userType===1) &&
              <Route path="" element={<AdminDashboard />}>
                <Route path="" element={<Companies />} />
                <Route path="accounts" element={<AdminAccounts />} />
                <Route path="companies" element={<Companies />} />
              </Route>
            
            }
            <Route></Route>
            <Route></Route>
            {/* </Route> */}
          </Route>
          <Route path="*" element={<PageNotFound/>}/>

        </Routes>

      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
