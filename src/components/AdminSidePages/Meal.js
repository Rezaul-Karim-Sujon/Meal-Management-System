import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMealListAction } from "./../../redux/meal/mealListUpdateAction";
import { updateMenuListAction } from "./../../redux/menu/menuListUpdateAction";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Meal() {
  const companyId = useSelector((state) => state.user.user.companyId);
  const mealList = useSelector((state) => state.mealList.mealList);
  const menuList = useSelector((state) => state.menuList.menuList);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
    .get("http://localhost:12269/api/Meals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if(res.status===200){
          console.log("fetch meal data : ",res.data)
          dispatch(updateMealListAction(res.data))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(menuList !==[]){
    axios
      .get("http://localhost:12269/api/MenuItems", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("menulistres ", res.data);
          dispatch(updateMenuListAction(res.data));
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []);


  useEffect(()=>{
    console.log(menuList)
  },[mealList,loading,menuList])

  if(loading){
    return < div className="foodItemsDiv">
    <div className="container">
      <div className="row">
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={50}/>
    <Skeleton counter={1} height={20}/>
        </div>
 
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={60}/>
    <Skeleton counter={1} height={20}/>
        </div>
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={50}/>
    <Skeleton counter={1} height={20}/>
        </div>
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={60}/>
    <Skeleton counter={1} height={20}/>
        </div>
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={50}/>
    <Skeleton counter={1} height={20}/>
        </div>
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={60}/>
    <Skeleton counter={1} height={20}/>
        </div>
        <div className="md-col-4 lg-col-3 sm-col-6">
        <Skeleton counter={1} height={20}/>
    <Skeleton count={1}  height={50}/>
    <Skeleton counter={1} height={20}/>
        </div>
      
      </div>
 
    </div>
    
 
    </div>
  } 

  return (
    <div className="menulist ">
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv ">
          <Link to="/createMeal">
            <button className="btn btn-primary">Create Meal</button>
          </Link>
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
        <h3>Meal List:</h3>
        <hr />
        {mealList.map((meal, key) => {
          return (
            <div key={meal.mealId} className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#collapseOne"+meal.id}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Meal #{meal.id} Menu #{meal.menuId} 
                    {meal.mealType == 1
                      ? "Breakfast"
                      : meal.mealType == 2
                      ? "Lunch"
                      : "Dinner"}
                  </button>
                </h2>
                <div
                  id={"collapseOne"+meal.id}
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {menuList.map((menu,key2) => {
                      return menu.menuId === meal.menuId &&
                        menu.fixedItem === true ? (
                          <div key={menu.menuItemFoodItems[0].foodItem.id} 
                          className="d-flex menuItemDiv">
                          <img className="cardImageMenu"
                            src={menu.menuItemFoodItems[0].foodItem.picture}
                          />
                          <div>
                            {
                              (menu.menuItemFoodItems[0].foodItem.recipeName)
                            }
                          </div>
                          <div>Group : #{(menu.groupId)}</div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              readOnly
                              checked={menu.isDifault ? "checked" : ""}
                            />
                            <label className="form-check-label">
                              default {"  "}
                            </label>
                          </div>
                          <div>
                            {menu.fixedItem
                              ? "  Fixed Item"
                              : "  Not Fixed"}
                          </div>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                    {menuList.map((menu,key2) => {
                      return menu.menuId === meal.menuId &&
                        menu.fixedItem === false ? (
                          <div key={key2} className="d-flex menuItemDiv">
                          <img className="cardImageMenu"
                            src={menu.menuItemFoodItems[0].foodItem.picture}
                          />
                          <div>
                            {
                              (menu.menuItemFoodItems[0].foodItem.recipeName)
                            }
                          </div>
                          <div>Group : #{(menu.groupId)}</div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              readOnly
                              checked={menu.isDifault ? "checked" : ""}
                            />
                            <label className="form-check-label">
                              default {"  "}
                            </label>
                          </div>
                          <div>
                            {menu.fixedItem
                              ? "  Fixed Item"
                              : "  Not Fixed"}
                          </div>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
