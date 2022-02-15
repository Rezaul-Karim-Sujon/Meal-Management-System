import "../App.css";
import React from "react";
import {Link ,Routes,Route, BrowserRouter} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { userLoginAction } from "../redux/user/userLoginAction";
import { userLoginFailedAction } from "./../redux/user/userLoginFailedAction";
import { useNavigate } from 'react-router-dom'; 

export default function App() {
  const dispatch = useDispatch()
  const errorMessage=useSelector(state=>state.user.errorMessage)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate('/')
    axios.post('http://localstorage:8000/users/login',data)
    .then(response=>{
      if(response.success===true){
        localStorage.setItem('token',response.details)
          navigate('/')
        }
      else{
        dispatch(userLoginFailedAction(response))
      }  
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>

    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <div>
        <h3>Login:</h3>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            {...register("email")}
            className="form-control"
            defaultValue={"email@example.com"}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-8">
          <input
            type="password"
            {...register("password")}
            className="form-control"
          />
        </div>
        {errorMessage !==""?<span>{errorMessage}</span>:""}
      </div>
      <div>{errorMessage}</div>
      {/* errors will return when field validation fails  */}
      {/*errors.exampleRequired && <span>This field is required</span>*/}
      <input type="submit" id="loginBtn" className="btn btn-primary" />
      <div>
        <span className="createAccount"><Link to='/signup'>Create Account</Link></span>
        <span className="forgetpass">Forget Password</span>
      </div>
    </form>
    </>
  );
}
