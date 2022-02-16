import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMealListAction } from "./../../redux/meal/mealListUpdateAction";
import axiosInstance from "../../utils/helperAxios";

export default function Meal() {
  const companyId = useSelector((state) => state.user.user.companyId);
  const mealList = useSelector((state) => state.mealList.mealList);
  const menuList = useSelector((state) => state.menuList.menuList);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("Meals", { companyId: companyId })
      .then((res) => {
        dispatch(updateMealListAction(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Meal #{meal.mealId} {meal.date} {meal.expireTime}
                    {meal.mealType == 1
                      ? "Breakfast"
                      : meal.mealType == 2
                      ? "Lunch"
                      : "Dinner"}
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    {menuList.map((menuObj,key2) => {
                      return menuObj.menuId === meal.menuId &&
                        menuObj.fixedItem === true ? (
                        <div className="d-flex">
                          <div>{menuObj.menuItemFoodItems.picture}</div>
                          <div>{menuObj.menuItemFoodItems.recipeName}</div>
                          <div>Fixed Item</div>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                    {menuList.map((menuObj,key2) => {
                      return menuObj.menuId === meal.menuId &&
                        menuObj.fixedItem === false ? (
                        <div className="d-flex">
                          <div>{menuObj.menuItemFoodItems.picture}</div>
                          <div>{menuObj.menuItemFoodItems.recipeName}</div>
                          <div>{menuObj.groupId}</div>
                          <div class="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={menuObj.isDifault ? "checked" : ""}
                            />
                            <label className="form-check-label">default</label>
                          </div>
                          <div>Fixed Item</div>
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
