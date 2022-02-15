
import { React, useEffect, useState } from "react";

export default function ItemsModal({foods,selectedIds, setSelectedIds}) {

  const [selectedIdsLocal, setSelectedIdsLocal] = useState(selectedIds);

  useEffect(()=>{
    setSelectedIdsLocal(selectedIds)
  },[selectedIds])

  useEffect(() => {
    console.log('Local : ',selectedIds);
  }, [selectedIdsLocal]);


  const handleClick = (event) => {
    const foodsId = Number(event.target.dataset.id);
    //if(selectedIds.hasOwnProperty(foodsId )){
    const newSelectedIds = {
      ...selectedIdsLocal,
      [foodsId]: !selectedIds[foodsId],
    };
    setSelectedIdsLocal(newSelectedIds);

  };


  return <>
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
                Food Items:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="searchDiv">
          <input
            type="text"
            placeholder="Search Items"
            className="form-control"
          />
        </div >
              <hr />
              <div>
              {foods.map((key, food) => {
                <div className={
                  selectedIdsLocal[food.foodItemId] === true ? "selectedCard" : "" + " card"
                }>
                  <img src={food.picture} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{food.foodName}</h5>
                    <p className="card-text">{food.recipy}</p>
                  </div>
                  <button className="btn btn-danger btn-sm">Delet</button>
                </div>;
              })}
              </div>

              <div
                onClick={(e) => handleClick(e)}
                data-id={5}
                className={
                  selectedIdsLocal[5] === true ? "selectedCard" : "" + " card"
                }
              >
                <img src="..." className="card-img-top" alt="..." data-id={5} />
                <div className="card-body" data-id={5}>
                  <h5 className="card-title" data-id={5}>
                    Card title 5
                  </h5>
                  <p className="card-text" data-id={5}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary" data-id={5}>
                    Go somewhere
                  </a>
                </div>
              </div>
              <div
                className={
                  selectedIdsLocal[6] === true ? "selectedCard" : "" + " card"
                }
                onClick={(e) => handleClick(e)}
                data-id={6}
              >
                <img src="..." className="card-img-top" alt="..." data-id={6} />
                <div className="card-body" data-id={6}>
                  <h5 className="card-title" data-id={6}>
                    Card title 6
                  </h5>
                  <p className="card-text" data-id={6}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary" data-id={6}>
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* onClick={()=>handleFoodItemIds()} */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={()=>setSelectedIds(selectedIdsLocal)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
  </>;
}
