import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import Item from "../Item/Item";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { MDBSpinner } from "mdb-react-ui-kit";

// Modal CSS
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const List = ({ list, total }) => {
  const { setBoughtFood } = useContext(Context);
  const { boughtFood } = useContext(Context);
  const { setTotal } = useContext(Context);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveIsOpen] = useState(false);
  const [loaderModalIsOpen, setLoaderModalIsOpen] = useState(false);
  const [checkout, setCheckout] = useState(0);
  const [saveCode, setSaveCode] = useState("");
  const loadPizzaRef = React.createRef();
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("amount-coupon"))
      setCheckout(JSON.parse(localStorage.getItem("amount-coupon")).checkout);
  }, []);

  const reset = () => {
    setBoughtFood([list[0]]);
    setTotal(list[0].price);
    setIsReset(true);
    localStorage.setItem("bought-foods", JSON.stringify(boughtFood));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveFoodCloseModal = () => {
    setSaveIsOpen(false);
  };

  const loader = () => {
    setTimeout(() => {
      setLoaderModalIsOpen(false);
    }, 2000);
  };

  const generateCode = () => {
    let code = "";
    for (let i = 0; i < 16; i++) {
      code += String.fromCodePoint(Math.ceil(Math.random() * 60) + 65);
    }
    return code;
  };

  const savePizza = () => {
    let code = generateCode();

    setSaveCode(code);

    if (localStorage.getItem("save-pizza-lc")) {
      localStorage.setItem(
        "save-pizza-lc",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("save-pizza-lc")),
          {
            code: code,
            foods: boughtFood,
          },
        ])
      );
    } else {
      localStorage.setItem(
        "save-pizza-lc",
        JSON.stringify([
          {
            code: code,
            foods: boughtFood,
          },
        ])
      );
    }
  };

  const loadPizza = () => {
    let code = loadPizzaRef.current.value;
    let savedPizzas = JSON.parse(localStorage.getItem("save-pizza-lc"));

    savedPizzas.forEach((element) => {
      if (element.code === code) {
        setBoughtFood((prev) => element.foods);
        setTotal(
          element.foods.reduce((a, b) => {
            return a + b.price * b.count;
          }, 0)
        );
        console.log(boughtFood)
      }
    });
    setSaveIsOpen(false);
    setLoaderModalIsOpen(true);

    // close after 2s
    loader();
  };

  return (
    <>
      {/* Checkout Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-4">
          <div className="row">
            <div className="col-12 text-center">
              <h4>Your Order</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <h6>The pizza has the following ingredients:</h6>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <ul>
                {boughtFood.map((item) => {
                  return (
                    <li key={item.name}>
                      {item.name}: {item.count}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <h4>Total price: ${total}</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <p>Continue to checkout?</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-evenly">
              <button className="btn btn-dark" onClick={closeModal}>
                Cancel
              </button>
              <Link className="btn btn-primary" to="/checkout">
                Continue
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      {/* Load pizza modal */}
      <Modal
        isOpen={saveModalIsOpen}
        onRequestClose={saveFoodCloseModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className="px-2">
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <button
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "20px",
                }}
                onClick={saveFoodCloseModal}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <p>Load a pizza using a configuration number: </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <input
                type="text"
                placeholder="Configuration Number"
                className="border rounded px-2"
                maxLength={16}
                ref={loadPizzaRef}
              />
              <button className="btn btn-primary" onClick={loadPizza}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Loader */}
      <Modal
        isOpen={loaderModalIsOpen}
        style={customStyles}
        contentLabel="Modal Loader"
      >
        <div className="px-2">
          {/* Loading */}
          <MDBSpinner role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      </Modal>

      <div className="row pb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <span>Your pizza:</span>
            <span
              style={{
                backgroundColor: "#888",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
            >
              {total}$
            </span>
          </div>
          <div>
            <button className="btn btn-warning" onClick={reset}>
              Reset pizza
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {list.map((item, i) =>
          i !== 0 ? (
            <Item
              item={item}
              key={item.name}
              isReset={isReset}
              setIsReset={setIsReset}
            />
          ) : null
        )}
      </div>

      <div className="row">
        <div className="col-12 d-flex flex-column border px-4 py-3">
          <div className="d-flex justify-content-between w-100">
            <span>Price:</span>
            <span>${total}</span>
          </div>
          <div className="d-flex justify-content-between w-100">
            <span>Checkout:</span>
            <span>${checkout}</span>
          </div>
          <div className="d-flex justify-content-between w-100">
            <h4>Total:</h4>
            <h4>${total - checkout}</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-between border px-4 py-3">
          <button className="btn btn-success" onClick={savePizza}>
            Save Pizza
          </button>
          <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            Checkout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-between border px-4 py-3">
          <button className="btn btn-dark" onClick={() => setSaveIsOpen(true)}>
            Load Pizza
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center px-4 py-3">
          {saveCode && (
            <span className="text-center text-success">
              Your pizza configuration has been saved. Your number is:{" "}
              {saveCode}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
