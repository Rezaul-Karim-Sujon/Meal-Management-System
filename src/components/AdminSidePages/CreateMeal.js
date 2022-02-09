import { React, useEffect, useState } from "react";
import axios from "axios";
import ItemsModal from "./ItemsModal";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import MenuListModal from "./MenuListModal";

export default function CreateMeal() {
  let [selectedIds, setSelectedIds] = useState({ 5: false, 6: false });
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
 

  /*
  useEffect(() => {
    axios
      .get("http://localhost:12269/api/foodItems")
      .then((res) => {
        setFoods(res);
        let selectedIdsVar = {};
        for (let item in res) {
          selectedIdsVar[item] = false;
        }
        console.log(selectedIdsVar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [foods]);
*/

  useEffect(() => {
    console.log("Local : ", selectedIds);
  }, [selectedIds]);

  const handleDelete = (foodId) => {
   if(window.confirm("Are You Sure to Delet?")===true){
    const newSelectedIds = {
      ...selectedIds,
      [foodId]: !selectedIds[foodId],
    };
    setSelectedIds(newSelectedIds);
   }
    
  };

  // const handleFoodItemIds = ()=>{
  //   let ids=[...foodIds]
  //   for (const key in selectedIds){
  //     if(selectedIds[key]){
  //       ids.push(key)
  //     }
  //   }
  //   setFoodIds(ids);
  //   console.log(foodIds)
  //   console.log(ids)
  // }


  const onSubmit = (data) => {
    console.log(' data for menu items type: ',data)
    navigate('/menuList')
    // axios.post('http://localstorage:8000/menu',data)
    // .then(response=>{
    //   console.log(response)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }


  return (
    <div className="createMenu">

      <div>
        <h3>Create New Meal:</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} >
        <div>
        <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Date: 
        </label>
        <div className="col-sm-3">
          <input
            type="date"
            // {...register("date")}
            className="form-control"
          />
        </div>
      </div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Select Menu
</button>
      <div>
        <h3>Items in Menu:</h3>
        <hr/>
      </div>
        </div>
        <input type="submit"  value={"Create Meal"} className="btn btn-primary" />

        </form>
      </div>
    <MenuListModal />
    </div>
  );
}
