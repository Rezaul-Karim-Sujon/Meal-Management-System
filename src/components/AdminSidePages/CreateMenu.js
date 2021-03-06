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
  let [defaultItems, setDefaultItems] = useState({ 5: false, 6: false });
  const menuList = useSelector(state =>state.menuList.menuList)
  const companyId = useSelector(state =>state.user.user.companyId)
  const foodItems = useSelector(state =>state.foodItems.foodItems)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:12269/api/foodItems",{"companyId":companyId})
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
    console.log("selected : ", defaultItems);
  }, [selectedIds]);
  useEffect(() => {
    console.log("defaultItems : ", defaultItems);
  }, [defaultItems]);

  const handleCheckboxClick = (foodId)=>{
    const newDefaultItems = {
      ...defaultItems,
      [foodId]: !defaultItems[foodId],
    };
    setDefaultItems(newDefaultItems);
    console.log('check ',newDefaultItems)
  }

  const handleDelete = (foodId) => {
   if(window.confirm("Are You Sure to Delet?")===true){
    const newSelectedIds = {
      ...selectedIds,
      [foodId]: !selectedIds[foodId],
    };
    setSelectedIds(newSelectedIds);
   }
    
  };

  const onSubmit = (data) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let newMenu={
      dateCreate:date,
      companyId:companyId,
    }
    let newMenuItemList = []
    for(let key in data){
      let newObj={
        foodItemId:Number(key),
        groupId:Number(data[key]),
        isDefault:defaultItems[key],
        fixedItem:Boolean(Number(data[key])===0)
      }
      console.log('newObj ',newObj)
      newMenuItemList.push(newObj)
    }
    const reqObj={
      menu:newMenu,
      menuItems:newMenuItemList
    }
    console.log(' data for menu items type: ',data)
    console.log(' item list from menu ',reqObj)
    navigate('/adminDashboard/menuList')
     axios.post('http://localhost:12269/api/Menus',reqObj)
    .then(response=>{
      console.log(' item list from menu ',response)
      let oldMenuList = [...menuList]
      oldMenuList.push(response)
      dispatch(updateMenuListAction(oldMenuList))
    })
    .catch(err=>{
      alert("Network Error! Try Again Latter")
      console.log(err)
    })
  }


  return (
    <div className="createMenu container">
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <option value={0}>Fixed</option>
                  <option value={1}>Group 1</option>
                  <option value={2}>Group 2</option>
                  <option value={3}>Group 3</option>
                  <option value={4}>Group 4</option>
                  <option value={5}>Group 5</option>
                
                </select>
              </div>
              <div className="form-check">
                <input className="form-check-input" onClick={()=>handleCheckboxClick(5)} type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label" for="defaultCheck1">
                  Default Item
                </label>
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
                  <option value={0}>Fixed</option>
                  <option value={1}>Group 1</option>
                  <option value={2}>Group 2</option>
                  <option value={3}>Group 3</option>
                  <option value={4}>Group 4</option>
                  <option value={5}>Group 5</option>
                </select>
              </div>
              <div className="form-check">
                <input className="form-check-input" onClick={()=>handleCheckboxClick(6)} type="checkbox" value="" id="defaultCheck2"/>
                <label className="form-check-label" for="defaultCheck2">
                  Default Item
                </label>
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
