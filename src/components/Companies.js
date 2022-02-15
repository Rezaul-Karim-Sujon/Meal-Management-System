import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

export default function Companies() {
  const companies = useSelector(state =>state.companies.companies)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:12269/api/Companies")
  //     .then((res) => {
     
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [])

useEffect(()=>{
console.log("companies  :- " , companies)
},[companies])

const onSubmit = (data) => {
  console.log("abahdhdhsdsvd ",data)
        /*
        let logo = data.logo[0];
        let reader = new FileReader();
        reader.readAsDataURL(logo);
        reader.onload = (e) => {
          data.logo = e.target.result;
          console.log("client data ", data);
          let newCompanies = [...companies]
          console.log("lastnewFoodItems ",newCompanies)
          newCompanies.push(data)
          dispatch(updateCompaniesAction(newCompanies))
          axios
            .post("http://localhost:12269/api/companies", data)
            .then((res) => {
              let newCompanies = [...companies]
              newCompanies.push(res)
              dispatch(updateCompaniesAction(newCompanies))
            })
            .catch((err) => { 
              console.log(err);
            });
          //setImage(e.target.result)
          
        };*/
}
  return (
    <div className="menulist ">
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv ">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCompany"
          >
            Add Company
          </button>
        </div>

        <div className="searchDiv">
          <input
            type="text"
            placeholder="Search Items"
            className="form-control"
          />
        </div>
      </div>
      <div className="accordion" id="accordionPanelsStayOpenExample">
      <h3>Companies:</h3>
      <hr/>
      {companies?.map((company,key)=>{
          return (
          <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Company # {company.companyName}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                  <div className="d-flex">
                    <div>{company.logo}</div>
                    <div>{company.address}</div>
                    <div>{company.website}</div>
                  </div>
                 
              </div>
            </div>
          </div>
          </div>
          )
        })}
      </div>


      <div
    className="modal fade"
    id="exampleModalCompany"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add Company:
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body addInputModal">
         

            <div className="row">
              <label className="col-sm-3 col-form-label">Company Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  {...register("companyName")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3 col-form-label">Logo</label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    {...register("logo")}
                  ></input>
                </div>
            </div>
            <div className="row">
              <label className="col-sm-3 col-form-label">Address</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  {...register("address")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3 col-form-label">Website</label>
              <div className="col-sm-9">
                <input
                  type="url"
                  {...register("website")}
                  className="form-control"
                />
              </div>
            </div>
            
        </div>
        <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <input
                type="submit"
                value={"Add Company"}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              />
            </div>
          
        </form>
      </div>
    </div>
  </div>
    </div>
  );
}
