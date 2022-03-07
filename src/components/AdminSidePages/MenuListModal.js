import { React, useEffect, useState } from "react";

export default function MenuListModal({ menuList, menuId, setMenuId }) {
  const [selectedMenuId, setSelectedMenuId] = useState(menuId);
  const [menuIdSet, setMenuIdSet] = useState(new Set());

  useEffect(() => {}, [selectedMenuId]);

  useEffect(() => {
    let menuSet = new Set();
    menuList.map((menu, key) => {
      menuSet.add(menu.menuId);
    });
    setMenuIdSet(menuSet);
  }, [menuList]);
  useEffect(() => {}, [menuIdSet]);

  // const handleSelectMenuClick = (menuId) => {
  //   console.log("menu Id selected ", selectedMenuId);
  //   if (selectedMenuId === menuId) setSelectedMenuId(null);
  //   else setSelectedMenuId(menuId);
  // };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {Array.from(menuIdSet)?.map((menuId, key) => {
                return (
                  <div key={menuId} className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapseOne" + String(menuId)}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Menu Is #{menuId}
                        </button>
                      </h2>
                      <div
                        id={"collapseOne" + String(menuId)}
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className={"accordion-body "}>
                          
                          {menuList.map((menu, key2) => {
                            return menu.menuId === menuId ? (
                              <div key={key2} className="d-flex menuItemDiv">
                                <img
                                  className="cardImageMenu"
                                  src={
                                    menu.menuItemFoodItems[0].foodItem.picture
                                  }
                                />
                                <div>
                                  {
                                    menu.menuItemFoodItems[0].foodItem
                                      .recipeName
                                  }
                                </div>
                                <div>Group : #{menu.groupId}</div>
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
                          <div className="d-flex">
                            <button className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={()=>setMenuId(menuId)}
                            >Select This Menu</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={() => {
                //   setMenuId(selectedMenuId);
                // }}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
