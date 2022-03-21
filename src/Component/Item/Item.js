import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";

const Item = ({ item, isReset, setIsReset }) => {
  const [count, setCount] = useState(0);
  const { totalMinus } = useContext(Context);
  const { totalPlus } = useContext(Context);
  const { setBoughtFood } = useContext(Context);
  const { boughtFood } = useContext(Context);
  let newItem = item;

  useEffect(() => {
    localStorage.setItem("bought-foods", JSON.stringify(boughtFood));

    boughtFood.forEach((food) => {
      if (food.id === item.id) setCount(food.count);
    });

    if (boughtFood.length === 1) {
      setCount(0);
    }
  }, [boughtFood]);

  useEffect(() => {
    setCount(0);
    setIsReset(false);
  }, [isReset]);

  useEffect(() => {
    boughtFood.forEach((element) => {
      if (item.id === element.id) {
        setCount((prev) => element.count);
      }
    });
  }, []);

  const increment = () => {
    setCount(count + 1);
    newItem.count += 1;

    setBoughtFood([
      ...boughtFood.filter((food) => food.id !== newItem.id),
      newItem,
    ]);

    totalPlus(item.id);

    if (boughtFood.every((food) => food.name !== item.name)) {
      setBoughtFood([...boughtFood, item]);
    }
  };

  const decrement = () => {
    setCount(count - 1);

    newItem.count -= 1;
    setBoughtFood([
      ...boughtFood.filter((food) => food.id !== newItem.id),
      newItem,
    ]);

    totalMinus(item.id);
    if (count - 1 === 0) {
      setBoughtFood(boughtFood.filter((food) => food.id !== item.id));
    }
  };

  return (
    <div className="col-12 border p-3 d-flex justify-content-between px-4 align-center">
      <div className="food-title d-flex flex-column">
        <div className="food-name" style={{ fontWeight: "600" }}>
          {item.name}
        </div>
        <div className="food-price" style={{ fontSize: "12px" }}>
          ${item.price}
        </div>
      </div>
      <div className="group-btn d-flex">
        <button
          className="btn btn-danger"
          style={{ fontSize: "18px", fontWeight: "600" }}
          onClick={decrement}
          disabled={count === 0}
        >
          -
        </button>
        <input
          type="number"
          defaultChecked={count}
          value={count}
          style={{
            width: "40px",
            textAlign: "right",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "2px",
            outline: "none",
          }}
          disabled
        />
        <button
          className="btn btn-success"
          style={{ fontSize: "18px", fontWeight: "600" }}
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
