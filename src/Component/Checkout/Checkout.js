import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [isCoupon, setIsCoupon] = useState(true);
  const [coupon, setCoupon] = useState();
  const [foods, setFoods] = useState([]);
  const emailRef = React.createRef();
  const mainRef = React.createRef();
  const history = useNavigate();

  useEffect(() => {
    setFoods([...JSON.parse(localStorage.getItem("bought-foods"))]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let coupons = [...JSON.parse(localStorage.getItem("coupon"))];
    coupons.map((item) => {
      if (coupon == item.name) {
        localStorage.setItem("amount-coupon", JSON.stringify(item));
        alert(`You have a $ ${item.checkout} discount`);
      }
    });
  };

  const handleChange = (e) => {
    let filter = /^\S+@\S+\.\S+$/;
    
    if (!emailRef.current.value.match(filter)) {
      mainRef.current.style.borderColor = "red";
    } else {
      mainRef.current.style.borderColor = "transparent";
    }
  };

  const back = () => {
    history("/");
  };

  const reset = () => {
    localStorage.removeItem('amount-coupon');
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={back}>
            Back
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <div className="row ">
            <div className="col-12 text-center pb-4">
              <h3>Ingredient info:</h3>
            </div>
          </div>

          <div className="row d-flex justify-content-between pb-4">
            {foods.map((food) => (
              <div className="col-3 d-flex" key={food.name}>
                <div className="d-flex align-items-center flex-column justify-content-between">
                  <h6>{food.name}</h6>
                  <img src={food.img} alt="food" style={{ width: "100%" }} />
                  <div>{food.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <div className="row ">
            <div className="col-12 text-center pb-2">
              <h3>Checkout info:</h3>
            </div>
          </div>

          <div
            className="row d-flex justify-content-between p-3"
            style={{
              border: "1px solid transparent",
              transition: "border-color .5s",
            }}
            ref={mainRef}
          >
            <div className="col-12">
              <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <label
                  htmlFor="name"
                  className="my-2 d-flex justify-content-between"
                >
                  <span style={{ flexGrow: "1" }}>Name:</span>
                  <input
                    type="text"
                    id="name"
                    style={{ flexGrow: "5" }}
                    required
                  />
                </label>

                <label
                  htmlFor="email"
                  className="my-2 d-flex justify-content-between"
                >
                  <span style={{ flexGrow: "1" }}>Email:</span>
                  <input
                    type="email"
                    id="email"
                    style={{ flexGrow: "5" }}
                    ref={emailRef}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  htmlFor="delivery"
                  className="my-2 d-flex justify-content-between"
                >
                  <span style={{ flexGrow: "1" }}>Choose delivery method:</span>
                  <select id="delivery" style={{ flexGrow: "5" }}>
                    <option value="1" key="1">
                      Delivery
                    </option>
                    <option value="2" key="2">
                      Local pickup
                    </option>
                  </select>
                </label>
                <label
                  htmlFor="notes"
                  className="d-flex align-items-center justify-content-between"
                >
                  <span style={{ flexGrow: "1" }}>Additional notes:</span>
                  <textarea
                    id="notes"
                    style={{ flexGrow: "5" }}
                    required
                  ></textarea>
                </label>
                <label htmlFor="client" className="my-2 d-flex">
                  <span>Are you a regular client?</span>
                  <span style={{ marginLeft: "10px" }}>
                    <input type="radio" />
                    Yes
                    <input type="radio" style={{ marginLeft: "10px" }} />
                    No
                  </span>
                </label>
                <label
                  htmlFor="coupon"
                  className="my-2 d-flex align-items-center"
                >
                  <span>Do you have a coupon code?</span>
                  <input
                    type="checkbox"
                    id="coupon"
                    onChange={() => setIsCoupon((prev) => !prev)}
                    style={{ marginLeft: "10px" }}
                  />
                </label>
                <label
                  htmlFor="coupon-code"
                  className="my-2 d-flex justify-content-between"
                >
                  <span style={{ flexGrow: "1" }}>Coupon:</span>
                  <input
                    type="text"
                    id="coupon-code"
                    maxLength={6}
                    disabled={isCoupon}
                    placeholder="Coupon"
                    style={{ flexGrow: "5" }}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </label>
                <div className="d-flex justify-content-end my-2">
                  <button
                    type="reset"
                    className="btn btn-dark"
                    style={{ marginRight: "10px" }}
                    onClick={reset}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
