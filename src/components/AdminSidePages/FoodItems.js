import { useEffect , useState} from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateFoodItemsAction } from "./../../redux/foodItems/foodItemsUpdateAction";
import axiosInstance from "../../utils/helperAxios";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FoodItems() {
  const { register, handleSubmit } = useForm();
  const token = localStorage.getItem("token");
  const foodItems = useSelector((state) => state.foodItems.foodItems);
  const companyId = useSelector((state) => state.user.user.companyId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    axios
      .get("http://localhost:12269/api/foodItems",
       {  headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false)
          console.log("res.data",res.data)
          dispatch(updateFoodItemsAction(res.data));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{console.log("loading ", loading)},[loading])

  const handleDelete = (index) => {
    if (window.confirm("Are You Sure To Delet?")) {
      //api req for delete
      const currFoods = [...foodItems];
      let newFoodItems = currFoods.splice(index - 1, 1);
      dispatch(updateFoodItemsAction(newFoodItems));
    }
  };

  const onSubmit = (data) => {
    let picture = data.picture[0];
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = (e) => {
      data.picture = e.target.result;
      data.companyInfoId = companyId;
      data.foodCategoryId = Number(data.foodCategoryId)
      console.log("client data ", data);
      axios
        .post("http://localhost:12269/api/foodItems", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status===200) {
            let newFoodItems = [...foodItems];
            newFoodItems.push(res.data[0]);
            dispatch(updateFoodItemsAction(newFoodItems));
            alert("New Food Item Created Successfully!")
          } else {
            console.log("err :", res);
          }
        })
        .catch((err) => {
          console.log("err :", err);
        });
      //setImage(e.target.result)
    };
  };

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
    <div className="foodItemsDiv">
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Items
          </button>
        </div>

        <div className="searchDiv">
          <input
            type="text"
            placeholder="Search Items"
            className="form-control"
          />
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Item:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body addInputModal">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <label className="col-sm-3 col-form-label">Recipy Name</label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="text"
                      {...register("recipeName")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label">Category</label>
                  <div className="col-sm-9">
                    <select {...register("foodCategoryId")} required>
                      <option value={1}>Fish</option>
                      <option value={2}>Mutton</option>
                      <option value={3}>Rice</option>
                      <option value={4}>Vagitables</option>
                    </select>
                  </div>
                  <div className="row">
                    <label className="col-sm-3 col-form-label">Picture</label>
                    <div className="col-sm-9">
                      <input
                        required
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        {...register("picture")}
                      ></input>
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
                  <input
                    type="submit"
                    value={"Create Item"}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h3>Food Items:</h3>
      <hr />
      <div className="container">
        <div className="row">
          {foodItems?.map((food, key) => {
            return (
              <div key={food.id} className="col-md-4 col-sm-6 col-lg-3 gridDiv">
                <div className="card">
                  <h5 className="card-title">{food.recipeName}</h5>
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
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(key)}
                  >
                    Delet
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
