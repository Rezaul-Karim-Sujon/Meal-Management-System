import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DisplayFoodItems from "./DisplayFoodItems";
import { useSelector, useDispatch } from 'react-redux';
import {updateFoodItemsAction} from './../../redux/foodItems/foodItemsUpdateAction'

export default function FoodItems() {
  const { register, handleSubmit } = useForm();

  const foodItems = useSelector(state =>state.foodItems.foodItems)
  const companyId = useSelector(state =>state.user.user.companyId)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios
    .get("http://localhost:12269/api/foodItems")
    .then((res) => {
      dispatch(updateFoodItemsAction(res))
    })
    .catch((err) => {
      console.log(err);
    })
  },[foodItems])

  const onSubmit = (data) => {
    let picture = data.picture[0];
    console.log('tst  ..  ',data)
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = (e) => {
      data.picture = e.target.result;
      data.companyId = companyId
      console.log("client data ", data);
      axios
        .post("http://localhost:12269/api/Users", data)
        .then((res) => {
          let newFoodItems = [...foodItems]
          newFoodItems.push(res)
          dispatch(updateFoodItemsAction(newFoodItems))
        })
        .catch((err) => { 
          console.log(err);
        });
      //setImage(e.target.result)
    };
  };

  return (
    <>
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Items
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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Item:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body addInputModal">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row">
                  <label className="col-sm-3 col-form-label">Food Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      {...register("foodName")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label">Recipy Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      {...register("recipy")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label">Category</label>
                  <div className="col-sm-9">
                    <select name="company" {...register("category")} id="cars">
                      <option value="volvo">Fish</option>
                      <option value="saab">Mutton</option>
                      <option value="mercedes">Rice</option>
                      <option value="audi">Vagitables</option>
                    </select>
                  </div>
                  <div className="row">
                    <label className="col-sm-3 col-form-label">Picture</label>
                    <div className="col-sm-9">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        {...register("picture")}
                      ></input>
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
                    value={"Create Item"}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="foodItems"><DisplayFoodItems /></div>
    </>
  );
}
