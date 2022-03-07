import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";


export default function Meal() {
  const companyId = useSelector(state =>state.user.user.companyId)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:12269/api/Users",{"companyId":companyId})
  //     .then((res) => {
        
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);



  return (
    <div className="menulist ">

        <div className="searchDiv row">
          <input
            type="text"
            placeholder="Search Items"
            className="form-control"
          />
        </div>
      <div >
      <h3>Users List:</h3>
      <hr/>
      all user Details
      </div>
    </div>
  );
}
