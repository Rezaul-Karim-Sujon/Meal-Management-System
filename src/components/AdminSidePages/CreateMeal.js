import { React, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MenuListModal from "./MenuListModal";
import { useSelector, useDispatch } from "react-redux";
import { updateMenuListAction } from "./../../redux/menu/menuListUpdateAction";
import { updateMealListAction } from "./../../redux/meal/mealListUpdateAction";

export default function CreateMeal() {
  const { register, handleSubmit } = useForm();
  const [menuId, setMenuId] = useState(null);

  const navigate = useNavigate();
  const menuList = useSelector((state) => state.menuList.menuList);
  const companyId = useSelector((state) => state.user.user.companyId);
  const mealList = useSelector((state) => state.mealList.mealList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:12269/api/Menus",{"companyId":companyId})
      .then((res) => {
        dispatch(updateMenuListAction(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [menuId]);

  const onSubmit = (data) => {
    data.companyId = companyId;
    data.menuId = menuId;
    console.log(" data for menu items type: ", data);
    navigate("/adminDashboard/meal");
    axios
      .post("http://localhost:12269/api/Meals", data)
      .then((response) => {
        let newMealList = [...mealList]
        newMealList.push(response)
        dispatch(updateMealListAction(newMealList))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="createMeal">
      <div>
        <h3>Create New Meal:</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="createMealForm">
          <div className="d-flex">
            <div className="col-sm-3">
              <label className="col-sm-2 col-form-label">Meal Type</label>
            </div>
            <div className="col-sm-3">
              <select {...register("mealType")} className="form-control">
                <option value={1}>BreakFast</option>
                <option value={2}>Lunch</option>
                <option value={3}>Dinner</option>
              </select>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-sm-3">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Date
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="date"
                {...register("date")}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="col-sm-3">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Start-Time
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="time"
                {...register("startTime")}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="col-sm-3">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Expired-Time
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="time"
                {...register("expireTime")}
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex">
            <div className="col-sm-3">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Menu
              </label>
            </div>
            <div className="col-sm-3">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="btn btn-link"
              >
                select Menu
              </button>
            </div>
          </div>
          {Boolean(menuId) === true ? (
            <>
              <h5 className="menulist_Heading">
                Items For Then Menu {menuId}:
              </h5>
              <hr />
              <div className="itemList">
                {menuList.map((key2, menuObj) => {
                  return menuObj.menuId === menuId &&
                    menuObj.fixedItem === true ? (
                    <div className="d-flex">
                      <div>{menuObj.foodItems.picture}</div>
                      <div>{menuObj.foodItems.recipeName}</div>
                      <div>Fixed Item</div>
                    </div>
                  ) : (
                    ""
                  );
                })}
                {menuList.map((key2, menuObj) => {
                  return menuObj.menuId === menuId &&
                    menuObj.fixedItem === false ? (
                    <div className="d-flex">
                      <div>{menuObj.foodItems.picture}</div>
                      <div>{menuObj.foodItems.recipeName}</div>
                      <div>{menuObj.groupId}</div>
                      <div classNAme="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox" disabled
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
              <input
                type="submit"
                value={"Create Meal"}
                className="btn btn-primary"
              />
            </>
          ) : (
            " "
          )}
        </form>
      </div>
      <MenuListModal
        menuList={menuList}
        menuId={menuId}
        setMenuId={setMenuId}
      />
    </div>
  );
}
