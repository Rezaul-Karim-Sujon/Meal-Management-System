import React, { useState } from "react";

export default function SelectItems({ foods, setFoods, setFoodIds }) {
  let [foodIds, setFoodids] = useState([]);
  let [selectedIds, setSelectedIds] = useState({});

  const handleClick = (event)=>{
    const foodsId = event.target.dataset.id
    if(selectedIds.hasOwnProperty(foodsId )){
      const newSelectedIds = {
        ...selectedIds,
        [foodsId]:!selectedIds[foodsId],
      };
      setSelectedIds(newSelectedIds);
    }
    else{
      const newSelectedIds = {
        ...selectedIds,
        [foodsId]:true,
      };
      setSelectedIds(newSelectedIds);
    }
    console.log(selectedIds)
  }

  return (
    <>
      <h3>Food Items:</h3>
      <hr />
      {foods.map((key, food) => {
        <div className="card" >
          <img src={food.picture} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{food.foodName}</h5>
            <p className="card-text">{food.recipy}</p>
          </div>
          <button className="btn btn-danger btn-sm">Delet</button>
        </div>;
      })}

      <div onClick={(e)=>handleClick(e)}  data-id={5}
        className={selectedIds[5] === true ? "selectedCard" : "" + " card"} >
        <img src="..." className="card-img-top" alt="..."  data-id={5}/>
        <div className="card-body" data-id={5}>
          <h5 className="card-title" data-id={5}>Card title{selectedIds[5]}</h5>
          <p className="card-text" data-id={5}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary" data-id={5}>
            Go somewhere
          </a>
        </div>
      </div>
      <div className={selectedIds[6] === true ? "selectedCard" : "" + " card"} onClick={(e)=>handleClick(e)}  data-id={6}>
        <img src="..." className="card-img-top" alt="..." data-id={6} />
        <div className="card-body" data-id={6}>
          <h5 className="card-title" data-id={6}>Card title</h5>
          <p className="card-text" data-id={6}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary" data-id={6}>
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}
