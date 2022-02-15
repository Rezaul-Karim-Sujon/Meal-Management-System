import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {updateMenuListAction} from './../../redux/menu/menuListUpdateAction'

export default function Menulist() {
  const companyId = useSelector(state =>state.user.user.companyId)
  const menuList = useSelector(state =>state.menuList.menuList)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("http://localhost:12269/api/Menus",{"companyId":companyId})
      .then((res) => {
        dispatch(updateMenuListAction(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [menuList]);
  return (
    <div className="menulist ">
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv ">
          <Link to="/adminDashboard/createMenu"><button
            className="btn btn-primary"
          >
            Create Menu
          </button></Link>
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
      <h3>Menu List:</h3>
      <hr/>
      {menuList.map((key,menu)=>{
          return (
          <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Menu Is {menu.menuId}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
              {menuList.map((key2,menuObj)=>{
                return(
                  (menuObj.menuId === menu.menuId && menuObj.fixedItem === true)?
                  <div className="d-flex">
                    <div>{menuObj.menuItemFoodItems.picture}</div>
                    <div>{menuObj.menuItemFoodItems.recipeName}</div>
                    <div>Fixed Item</div>
                  </div>:"")
                  }
                )
              }
              {menuList.map((key2,menuObj)=>{
                return(
                  (menuObj.menuId === menu.menuId && menuObj.fixedItem === false) ?
                  <div className="d-flex">
                    <div>{menuObj.menuItemFoodItems.picture}</div>
                    <div>{menuObj.menuItemFoodItems.recipeName}</div>
                    <div>{menuObj.groupId}</div>
                    <div class="form-check">
                      <input className="form-check-input" type="checkbox"  
                      checked={menuObj.isDifault?"checked":""}/>
                      <label className="form-check-label" >
                        default
                      </label>
                    </div>
                    <div>Fixed Item</div>
                  </div>:""
                    )
              })}
              </div>
            </div>
          </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}
