import "../App.css";
import React,{useState} from "react";
import {Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
import { userLoginAction } from "../redux/user/userLoginAction";
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from "../utils/helperAxios";

export default function App() {
  const dispatch = useDispatch()
  const errorMessage=useSelector(state=>state.user.errorMessage)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error,setError]=useState(null)

  const onSubmit = (data) => {
    axiosInstance.post('users/login',data)
    .then(response=>{
      console.log("res : ",response)
      if(response.status===200){
        localStorage.setItem('token',response.data.details)
        dispatch(userLoginAction(response.data.data))
          navigate('/')
        }
      else{
        setError(response.data.message)
      }  
    })
    .catch(err=>{
      setError("Network Eror! Check Your Internet Connection")
      console.log(err)
    })
  }


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
            {...register("name")}
            className="form-control"
            required
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
            required
          />
        </div>
        {/* {errorMessage !==""?<span>{errorMessage}</span>:""} */}
      </div>
      <div><span className="errorMessage">{error}</span></div>
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
