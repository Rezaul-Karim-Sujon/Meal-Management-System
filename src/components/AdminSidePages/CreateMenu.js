import { React, useEffect, useState } from "react";
import axios from "axios";
import ItemsModal from "./ItemsModal";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {updateMenuListAction} from './../../redux/menu/menuListUpdateAction'
import {updateFoodItemsAction} from './../../redux/foodItems/foodItemsUpdateAction'

export default function CreateMenu() {

  let [selectedIds, setSelectedIds] = useState({ 5: false, 6: false });
  const menuList = useSelector(state =>state.menuList.menuList)
  const foodItems = useSelector(state =>state.foodItems.foodItems)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
 

  useEffect(() => {
    axios
      .get("http://localhost:12269/api/foodItems")
      .then((res) => {
        dispatch(updateFoodItemsAction(res));
        let selectedIdsVar = {};
        for (let item in res) {
          selectedIdsVar[item] = false;
        }
        console.log(selectedIdsVar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


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
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Select Item
          </button>
        </div>
      </div>

      <div>
        <h3>Food Items:</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          {/* {foods.map((key, value) => 
              <div key={key} className="row">
                Id:{key}<button onClick={(value)=>handleDelete(value)} className="btn btn-danger btn-m">Delet</button>
              </div>
          )}  */}



          {selectedIds[5] === true ? (
            <div className="d-flex selectedItems" key={5}>
              <div>Id : {5}</div>
              <div>
                Select Item Group:
                <select {...register(String(5))}>
                  <option value={"none"}>None</option>
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                  <option value={"C"}>C</option>
                  <option value={"D"}>D</option>
                  <option value={"AA"}>Option for A</option>
                  <option value={"BB"}>Option for B</option>
                  <option value={"CC"}>Option for C</option>
                  <option value={"DD"}>Option for D</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(5)}
                >
                  Delet
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {selectedIds[6] === true ? (
            <div className="d-flex selectedItems" key={6}>
              <div>Id : {6} </div>
              <div>
                Select Item Group:
                <select {...register(String(6))}>
                <option value={"none"}>None</option>
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                  <option value={"C"}>C</option>
                  <option value={"D"}>D</option>
                  <option value={"AA"}>Option for A</option>
                  <option value={"BB"}>Option for B</option>
                  <option value={"CC"}>Option for C</option>
                  <option value={"DD"}>Option for D</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(6)}
                >
                  Delet
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          
        </div>
        <input type="submit"  value={"Create Menu"} className="btn btn-primary" />

        </form>
      </div>
      <ItemsModal
        foods={foodItems}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}
