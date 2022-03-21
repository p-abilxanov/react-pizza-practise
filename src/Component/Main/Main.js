import React, { useState } from "react";
import List from "../List/List";
import Pizza from "../Pizza/Pizza";
import Context from "../Context/Context";

const PIZZA = [
  {
    id: 0,
    name: "Pizza",
    price: 3.0,
    img: "./image/img7.jpg",
    count: 1,
  },
  {
    id: 1,
    name: "Cold cuts",
    price: 3.0,
    img: "./image/img2.jpg",
    count: 0,
  },
  {
    id: 2,
    name: "Pepperoni",
    price: 2.5,
    img: "./image/img6.jpg",
    count: 0,
  },
  {
    id: 3,
    name: "Feta",
    price: 1.5,
    img: "./image/img4.jpg",
    count: 0,
  },
  {
    id: 4,
    name: "Mozzarella",
    price: 1.0,
    img: "./image/img5.jpg",
    count: 0,
  },
  {
    id: 5,
    name: "Swiss cheese",
    price: 2.0,
    img: "./image/img3.jpg",
    count: 0,
  },
  {
    id: 6,
    name: "Spices",
    price: 0.25,
    img: "./image/img8.jpg",
    count: 0,
  },
  {
    id: 7,
    name: "Vegetables",
    price: 0.75,
    img: "./image/img1.jpg",
    count: 0,
  },
];

if (!localStorage.getItem("all-products"))
  localStorage.setItem("all-products", JSON.stringify(PIZZA));

const SumPrice = (arr) => {
  return arr.reduce((acc, b) => acc + b.price, 0);
};

const Main = () => {
  const [boughtFood, setBoughtFood] = useState(
    localStorage.getItem("bought-foods")
      ? [...JSON.parse(localStorage.getItem("bought-foods"))]
      : [PIZZA[0]]
  );
  const [total, setTotal] = useState(SumPrice(boughtFood));

  const totalPlus = (id) => {
    PIZZA.forEach((item) => {
      if (item.id === id) {
        setTotal((prev) => prev + item.price);
      }
    });
  };
  const totalMinus = (id) => {
    PIZZA.forEach((item) => {
      if (item.id === id) {
        setTotal((prev) => prev - item.price);
      }
    });
  };

  return (
    <Context.Provider
      value={{ totalPlus, totalMinus, setBoughtFood, boughtFood, setTotal }}
    >
      <div className="container p-5">
        <div className="row">
          <div className="col-8">
            <Pizza data={boughtFood} />
          </div>
          <div className="col-4">
            <List list={PIZZA} total={total} />
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Main;
