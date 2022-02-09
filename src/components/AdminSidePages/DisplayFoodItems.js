import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {updateFoodItemsAction} from './../../redux/foodItems/foodItemsUpdateAction'

export default function DisplayFoodItems() {
  const foodItems = useSelector(state =>state.foodItems.foodItems)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios
    .get("http://localhost:12269/api/foodItems")
    .then((res) => {
      dispatch(updateFoodItemsAction(res))
    })
    .catch((err) => {
      console.log(err);
    })
  },[foodItems])

  return(
    
  <>

<h3>Food Items:</h3>
<hr/>
  {foodItems.map((key,food)=>{
      <div  className="card" style="width: 18rem;">
      <img src={food.picture} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{food.foodName}</h5>
        <p className="card-text">{food.recipy}</p>
      </div>
      <button className='btn btn-danger btn-sm'>Delet</button>
    </div>
  })}
  
  </>
  )
}
