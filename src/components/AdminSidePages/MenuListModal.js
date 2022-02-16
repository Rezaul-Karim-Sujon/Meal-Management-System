
import { React, useEffect, useState } from "react";

export default function MenuListModal({menuList, menuId, setMenuId}) {
const [selectedMenuId,setSelectedMenuId] = useState(menuId )

useEffect(()=>{
},[selectedMenuId])


  return( <>
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {menuList.map((menu,key)=>{
          return (
          <div key = {key} className="accordion" id="accordionExample">
          <div className={"accordion-item "+ menu.menuId === selectedMenuId?"selectedCard":""}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Menu Is {menu.menuId}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              {menuList.map((menuObj,key2)=>{
                return(
                  (menuObj.menuId === menu.menuId && menuObj.fixedItem === true)?
                  <div key={key2} className="d-flex">
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
                  <div key={key2} className="d-flex">
                    <div>{menuObj.menuItemFoodItems.picture}</div>
                    <div>{menuObj.menuItemFoodItems.recipeName}</div>
                    <div>{menuObj.groupId}</div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox"  disabled 
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
            <div className="d-flex">
              <button className="btn btn-light btn-sm" onClick={()=>setSelectedMenuId(menu.menuId)}>Select Menu</button>
              <button className="btn btn-light btn-sm" onClick={()=>setSelectedMenuId(null)}>De-Select Menu</button>
            </div>
          </div>
          </div>
          )
        })}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{setMenuId(selectedMenuId)}} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </>
  )
}
