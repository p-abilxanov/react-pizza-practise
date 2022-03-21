import Main from "./Component/Main/Main";
import Checkout from "./Component/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";

function App() {
  if (!localStorage.getItem("coupon")) {
    localStorage.setItem(
      "coupon",
      JSON.stringify([
        { id: 1, name: 123456, checkout: 10 },
        { id: 2, name: 111111, checkout: 8 },
        { id: 3, name: 222222, checkout: 5 },
        { id: 4, name: 333333, checkout: 12 },
        { id: 5, name: 444444, checkout: 7.5 },
      ])
    );
  }
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
