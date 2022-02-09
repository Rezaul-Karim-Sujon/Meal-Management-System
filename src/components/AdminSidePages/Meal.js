import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

export default function Meal() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:12269/api/Users")
      .then((res) => {
        setMeals(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setMeals]);
  return (
    <div className="menulist ">
      <div className="itemHeaderDiv row">
        <div className="itemAddBtnDiv ">
          <Link to="/createMeal"><button
            className="btn btn-primary"
          >
            Create Meal
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
      <h3>Meal List:</h3>
      <hr/>
      {meals.map((key, menu) => {
        return (
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classNamees that we use to style each element. These classNamees control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
