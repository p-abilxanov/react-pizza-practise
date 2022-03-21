import Animation from "../Animation/Animation";
import ItemPizza from "../ItemPizza/ItemPizza";

const Pizza = ({ data }) => {
  return (
    <>
      <div className="row pb-4 text-center">
        <div className="col-12" style={{ fontWeight: "600" }}>
          Your pizza:
        </div>
      </div>
      <div className="row">
        {data.map((item) => (
          <div className="col-4 d-flex mb-4" key={item.name}>
            <Animation>
              <ItemPizza item={item} />
            </Animation>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pizza;
