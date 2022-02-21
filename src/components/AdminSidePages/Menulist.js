import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/helperAxios";
import { useSelector, useDispatch } from "react-redux";
import { updateMenuListAction } from "./../../redux/menu/menuListUpdateAction";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Menulist() {
  const companyId = useSelector((state) => state.user.user.companyId);
  const token = localStorage.getItem("token");
  const menuList = useSelector((state) => state.menuList.menuList);
  const dispatch = useDispatch();
  const [menuIdSet, setMenuIdSet] = useState(new Set());
  const [showAccordionMenu,setShowAccordionMenu]=useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
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
      });
  }, []);

  useEffect(() => {
    let menuSet = new Set();
    menuList.map((menu, key) => {
      menuSet.add(menu.menuId);
    });
    setMenuIdSet(menuSet);

  }, [menuList]);
  useEffect(() => {}, [menuIdSet]);

useEffect(()=>{console.log("Loading ", loading)},[loading])

  // const handleAccordionShow=(itemId)=>{
  //   if(showAccordionMenu===itemId)setShowAccordionMenu(null)
  //   else setShowAccordionMenu(itemId)
  // }

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
    <>
    class
      <div className="menulist ">
        <div className="itemHeaderDiv row">
          <div className="itemAddBtnDiv ">
            <Link to="/createMenu">
              <button className="btn btn-primary">Create Menu</button>
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
          <h3>Menu List:</h3>
          <hr />
          {Array.from(menuIdSet)?.map((menuId, key) => {
            return (
              <div key={menuId} className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapseOne"+String(menuId)}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    //  onClick={ ()=>handleAccordionShow(menuId)}
                    >
                      Menu Is #{menuId} 
                    </button>
                  </h2>
                  <div
                    id={"collapseOne"+String(menuId)}
                    className={"accordion-collapse collapse show"}
                    // showAccordionMenu===menuId?" show ":""}
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {menuList.map((menu, key2) => {
                        return menu.menuId === menuId ? (
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
    </>
  );
}
