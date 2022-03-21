import React from "react";

const Context = React.createContext({
  totalPlus: (id) => {},
  totalMinus: (id) => {},
  setBoughtFood: (item) => {},
  boughtFood: [],
  setTotal: (cost) => {},
});

export default Context;
