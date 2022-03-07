import { React, useEffect, useState } from "react";

export default function ItemsModal({ foodItems, selectedIds, setSelectedIds }) {
  const [selectedIdsLocal, setSelectedIdsLocal] = useState(selectedIds);


  useEffect(() => {
    setSelectedIdsLocal(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    console.log("Local : ", selectedIdsLocal);
  }, [selectedIdsLocal]);

  const handleClick = (foodsId) => {
    if (foodsId in selectedIdsLocal) {
      const newselectedIds = {
        ...selectedIdsLocal,
        [foodsId]: !selectedIdsLocal[foodsId],
      };
      setSelectedIdsLocal(newselectedIds);
      console.log("check ", newselectedIds);
    } else {
      const newselectedIds = {
        ...selectedIdsLocal,
        [foodsId]: true,
      };
      setSelectedIdsLocal(newselectedIds);
      console.log("check ", newselectedIds);
    }
  };

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
              </div>
              <hr />
              <div className="container">
                <div className="row">
                {foodItems?.map((food, key) => {
                  return (
                    <div className="col-md-4 col-sm-6 col-lg-3 gridDiv" key={food.id}>
                    <div className={
                       (selectedIdsLocal[food.id]===true)?"selectedCard":"" +" card "}
                      
                      // className={
                      //   selectedIdsLocal[food.foodItemId] === true
                      //     ? "selectedCard"
                      //     : "" + " card foodCard col-sm-4"
                      // }
                      onClick={() => handleClick(food.id)}

                    >
                      <h5 className="card-title">{food.recipeName}</h5>{" "}
                      {food.recipyName}
                      <div className="card-body">
                        <p className="card-text">
                          Category : {food.foodCategory.name}
                        </p>
                        <img
                          src={food.picture}
                          className="card-img-top cardImage"
                          alt="..."
                        />
                      </div>
                    </div>
                    </div> 
                  )
                })}
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
                onClick={() => setSelectedIds(selectedIdsLocal)}
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
