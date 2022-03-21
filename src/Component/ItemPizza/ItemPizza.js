const ItemPizza = ({ item }) => {
  return (
      <div className="row h-100">
        <div className="col-10 border d-flex align-items-center">
          <img src={item.img} alt="pizza" style={{ width: "100%" }} />
        </div>
      </div>
  );
};

export default ItemPizza;
