import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {Link} from 'react-router-dom'
import axios from  'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, getToken } from "./../utils/tokenFunction";

import {userLoginAction} from "../redux/user/userLoginAction";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const [image,setImage] =  useState('')
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    data.companyId = Number(data.companyId)
    let picture = data.picture[0]
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onload = (e)=>{
      data.picture=e.target.result
      console.log('client data ',data)
      axios.post('http://localhost:12269/api/Users',data)
      .then(response=>{
        console.log('fsvsfd ')
        setToken(response.data.user)
        dispatch(userLoginAction(response.data.user))
      })
      .catch(err=>{
        console.log(err)
      })
      //setImage(e.target.result)
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
            <input
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
            <input
              type="text"
              {...register("email")}
              className="form-control"
              id="staticEmail"
              defaultValue={"email@example.com"}
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
            <input
              type="text"
              {...register("phone")}
              className="form-control"
              id="staticEmail"
              defaultValue={"email@example.com"}
            />
          </div>
        </div>
        <div className="col-md">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Company
          </label>
          <div className="col-sm-8">
            <select {...register("companyId")} id="cars">
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
              id="inputPassword"
            />
          </div>
        </div>
        <div className="col-md">
          <label htmlFor="inputPassword" className="col-sm-8 col-form-label">
            Retype Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              {...register("password2")}
              className="form-control"
              id="inputPassword"
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
          ></input>
        </div>
      </div>
   <img src={image}/>
      <div className="createBtndiv">
        <span className="Login Account"><Link to='/login'>Already have an account? Login</Link></span>
        <input type="submit" id="signInBtn" value={"Create Account"} className="btn btn-primary" />

      </div>
      
    </form>
  );
}
