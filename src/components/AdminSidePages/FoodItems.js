import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {updateFoodItemsAction} from './../../redux/foodItems/foodItemsUpdateAction'

export default function FoodItems() {
  const { register, handleSubmit } = useForm();

  const foodItems = useSelector(state =>state.foodItems.foodItems)
  const companyId = useSelector(state =>state.user.user.companyId)
  const dispatch = useDispatch()

  useEffect(()=>{
     axios
     .get("http://localhost:12269/api/foodItems",{"companyId":companyId})
     .then((res) => {
       dispatch(updateFoodItemsAction(res))
    })
    .catch((err) => {
      console.log(err);
    })
   },[])

   useEffect(()=>{
console.log("strore ",foodItems)
   },[foodItems])


  const onSubmit = (data) => {
    let picture = data.picture[0];
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = (e) => {
      data.picture = e.target.result;
      data.companyId = companyId
      console.log("client data ", data);
      let newFoodItems = [...foodItems]
      console.log("lastnewFoodItems ",newFoodItems)
      newFoodItems.push(data)
      dispatch(updateFoodItemsAction(newFoodItems))
      axios
        .post("http://localhost:12269/api/foodItems", data)
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
    <div className="foodItemsDiv">
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
                    <select {...register("category")} id="cars">
                      <option value="Fish">Fish</option>
                      <option value="Mutton">Mutton</option>
                      <option value="Rice">Rice</option>
                      <option value="Vagitables">Vagitables</option>
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
      <h3>Food Items:</h3>
<hr/>
      <div className="foodItems grid">

  {foodItems?.map((food,key)=>{
    return(
      <div key={food.id}  className="card foodCard col-sm-4" >
      <h5 className="card-title">{food.foodName}</h5>
      <img src={food.picture} className="card-img-top cardImage" alt="..."/>
      {food.recipyName}
      <div className="card-body">
       
        <p className="card-text">{food.recipy}</p>
      </div>
      <button className='btn btn-danger btn-sm'>Delet</button>
    </div>
    )
  })}
      </div>
    </div>
  );
}
