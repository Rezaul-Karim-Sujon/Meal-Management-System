import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Meal from "./components/AdminSidePages/Meal";
import Menulist from "./components/AdminSidePages/Menulist";
import FoodItems from "./components/AdminSidePages/FoodItems";
import Accounts from "./components/AdminSidePages/Accounts";
import CreateMenu from "./components/AdminSidePages/CreateMenu";
import CreateMeal from "./components/AdminSidePages/CreateMeal";

import { setToken, getToken } from "./utils/tokenFunction";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState({});

  useEffect(() => {
    setToken(getToken("token"));

  }, [token]);

  // if(!token) {
  //    return <Login setToken={setToken} />
  //  }
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home token={token}/>}>
            <Route path="/" element={<Meal />} />
            <Route path="meal" element={<Meal />} />
            <Route path="menuList" element={<Menulist />} />
            <Route path="foodItems" element={<FoodItems />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="createMenu" element={<CreateMenu />} />
            <Route path="createMeal" element={<CreateMeal />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
