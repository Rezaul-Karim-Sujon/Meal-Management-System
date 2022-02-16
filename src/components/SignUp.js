import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {Link, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, getToken } from "./../utils/tokenFunction";
import {userLoginAction} from "../redux/user/userLoginAction";
import axiosInstance from "../utils/helperAxios";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const [image,setImage] =  useState('')
  const dispatch = useDispatch()
  const [error,setError]=useState(null)

  useEffect(()=>{

  },[error])

  const onSubmit = (data) => {
    setError(null)
    if(data.password===data.password2){
    data.companyId = Number(data.companyId)
    let picture = data.picture[0]
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onload = (e)=>{
      data.picture=e.target.result
      console.log('client data ',data)
      axiosInstance.post('Users',data)
      .then(response=>{
        if(response.data.success){
        Navigate("/login")
        alert(response.data.message)
        }
        else{
          setError(response.data.message)
        }
      })
      .catch(err=>{
        setError("Network Error! Check Your Internet Connection")
      })
      //setImage(e.target.result)
    }
  }
  else{
    setError("Password Does't match! Try Again")
  }
  }

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signUpForm">
      <div>
        <h3>Create Account:</h3>
        <hr/>
      </div>

      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="staticName" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-8">
            <input required
              type="text"
              {...register("name")}
              className="form-control"
              id="staticName"
            />
          </div>
        </div>
        <div className="col-md">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            E-mail
          </label>
          <div className="col-sm-8">
            <input required
              type="text"
              {...register("email")}
              className="form-control"
              placeholder={"email@example.com"}
            />
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-8">
            <input required
              type="text"
              {...register("phone")}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md">
          <label className="col-sm-2 col-form-label">
            Company
          </label>
          <div className="col-sm-8">
            <select {...register("companyId")} >
              <option value={Number(1)}>Vivasoft</option>
              <option value={Number(2)}>Facebook</option>
              <option value={Number(3)}>Mercedes</option>
              <option value={Number(4)}>Audi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              id="inputPassword" required
            />
          </div>
        </div>
        <div className="col-md">
          <label htmlFor="inputPassword2" className="col-sm-8 col-form-label">
            Retype Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              {...register("password2")}
              className="form-control"
              id="inputPassword2" required
            />
          </div>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Picture
        </label>
        <div className="col-sm-8">
          <input
            type="file" accept="image/*"
            className="form-control-file"
            {...register("picture")}
            required
          ></input>
        </div>
      </div>
      <div><span className="errorMessage">{error}</span></div>
      {/* <img src={image}/> */}
      <div className="createBtndiv">
        <span className="Login Account"><Link to='/login'>Already have an account? Login</Link></span>
        <input type="submit" id="signInBtn" value={"Create Account"} className="btn btn-primary" />

      </div>
      
    </form>
  );
}
