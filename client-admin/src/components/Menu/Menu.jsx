import "./Menu.css";
import { CiBurger, CiFries, CiPizza, CiSearch } from "react-icons/ci";
import { FaCarrot } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiDrinksLine } from "react-icons/ri";
import pizza1 from "../../assets/pizzas/pizza1.png";
import pizza2 from "../../assets/pizzas/pizza2.png";
import pizza3 from "../../assets/pizzas/pizza3.png";
import pizza4 from "../../assets/pizzas/pizza4.png";
import pizza5 from "../../assets/pizzas/pizza5.png";
import pizza6 from "../../assets/pizzas/pizza6.png";
import burger1 from "../../assets/burgers/burger.jpg";
import coke from "../../assets/Drinks/coke.jpg";
import veggiesImage from "../../assets/veggies/veggiesImage.jpg";
import friesImage from "../../assets/frenchfries/friesImage.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "./../../../node_modules/react-redux/src/hooks/useDispatch";
import {
  addItem,
  decrementItem,
  incrementItem,
} from "../../Slices/orderSlice";
import { useSelector } from "react-redux";

const burgers = [
  {
    name: "Burger1",
    image: burger1,
    price: "200",
    category: "burger",
  },
  {
    name: "Burger2",
    image: burger1,
    price: "200",
    category: "burger",
  },
  {
    name: "Burger3",
    image: burger1,
    price: "200",
    category: "burger",
  },
  {
    name: "Burger4",
    image: burger1,
    price: "200",
    category: "burger",
  },
  {
    name: "Burger5",
    image: burger1,
    price: "200",
    category: "burger",
  },
  {
    name: "Burger6",
    image: burger1,
    price: "200",
    category: "burger",
  },
];

const pizzas = [
  {
    name: "Cappricciosa",
    image: pizza1,
    price: "200",
    category: "pizza",
  },
  {
    name: "Sicilian",
    image: pizza2,
    price: "200",
    category: "pizza",
  },
  {
    name: "Marinara",
    image: pizza3,
    price: "200",
    category: "pizza",
  },
  {
    name: "Pepperoni2",
    image: pizza4,
    price: "200",
    category: "pizza",
  },
  {
    name: "Marinara2",
    image: pizza5,
    price: "200",
    category: "pizza",
  },
  {
    name: "Pepperoni1",
    image: pizza6,
    price: "200",
    category: "pizza",
  },
];

const drinks = [
  {
    name: "Coke",
    image: coke,
    price: "200",
    category: "drink",
  },
  {
    name: "Fanta",
    image: coke,
    price: "200",
    category: "drink",
  },
  {
    name: "Sprite",
    image: coke,
    price: "200",
    category: "drink",
  },
  {
    name: "Coke2",
    image: coke,
    price: "200",
    category: "drink",
  },
  {
    name: "Fanta2",
    image: coke,
    price: "200",
    category: "drink",
  },
  {
    name: "Sprite2",
    image: coke,
    price: "200",
    category: "drink",
  },
];

const fries = [
  {
    name: "Fries1",
    image: friesImage,
    price: "200",
    category: "fries",
  },
  {
    name: "Fries2",
    image: friesImage,
    price: "200",
    category: "fries",
  },
  {
    name: "Fries3",
    image: friesImage,
    price: "200",
    category: "fries",
  },
  {
    name: "Fries4",
    image: friesImage,
    price: "200",
    category: "fries",
  },
  {
    name: "Fries5",
    image: friesImage,
    price: "200",
    category: "fries",
  },
  {
    name: "Fries6",
    image: friesImage,
    price: "200",
    category: "fries",
  },
];

const veggies = [
  {
    name: "Veggies1",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
  {
    name: "Veggies2",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
  {
    name: "Veggies3",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
  {
    name: "Veggies4",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
  {
    name: "Veggies5",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
  {
    name: "Veggies6",
    image: veggiesImage,
    price: "200",
    category: "veggies",
  },
];
const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderItems } = useSelector((store) => store.orders);

  const [activeItem, setActiveItem] = useState("Burger");
  const [items, setItems] = useState(burgers);

  const checkOut = () => {
    if (Object.keys(orderItems).length > 0) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (activeItem === "Burger") {
      return setItems(burgers);
    } else if (activeItem === "Pizzas") {
      return setItems(pizzas);
    } else if (activeItem === "Drinks") {
      return setItems(drinks);
    } else if (activeItem === "Fries") {
      return setItems(fries);
    } else if (activeItem === "Veggies") {
      return setItems(veggies);
    }
  }, [activeItem]);

  const handleAddItem = (item, index) => {
    dispatch(addItem({ item, index }));
  };

  const handleIncrement = (item, index) => {
    dispatch(incrementItem({ item, index }));
  };

  const handleDecrement = (item, index) => {
    dispatch(decrementItem({ item, index }));
  };

  return (
    <div className="menu-container">
      <div className="menu-container-head">
        <h2>Good Evening</h2>
        <p>Place your Order here</p>
      </div>

      <div className="search-input">
        <CiSearch />
        <input type="text" placeholder="Search" />
      </div>

      <div className="categories">
        <div
          className={`menu-items ${activeItem === "Burger" && "active"}`}
          onClick={() => setActiveItem("Burger")}
        >
          <CiBurger size={"32px"} />
          <p>Burger</p>
        </div>
        <div
          className={`menu-items ${activeItem === "Pizzas" && "active"}`}
          onClick={() => setActiveItem("Pizzas")}
        >
          <CiPizza size={"32px"} />
          <p>Pizza</p>
        </div>
        <div
          className={`menu-items ${activeItem === "Drinks" && "active"}`}
          onClick={() => setActiveItem("Drinks")}
        >
          <RiDrinksLine size={"28px"} />
          <p>Drink</p>
        </div>
        <div
          className={`menu-items ${activeItem === "Fries" && "active"}`}
          onClick={() => setActiveItem("Fries")}
        >
          <CiFries size={"28px"} />
          <p>French Fries</p>
        </div>
        <div
          className={`menu-items ${activeItem === "Veggies" && "active"}`}
          onClick={() => setActiveItem("Veggies")}
        >
          <FaCarrot size={"28px"} />
          <p>Veggies</p>
        </div>
      </div>

      <h2 style={{ marginTop: "20px", fontSize: "32px", fontWeight: "500" }}>
        {activeItem}
      </h2>
      <div className="items">
        {items?.map((item, index) => {
          const key = `${item.name}_${index}`;
          const orderItem = orderItems.find((i) => i.key === key);
          const qty = orderItem ? orderItem.qty : 0;
          return (
            <div key={index} className="item">
              <img src={item?.image} alt={item?.name} />
              <div className="item-details">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p>{item?.name}</p>
                  <p>
                    <span>&#8377;</span> {item?.price}
                  </p>
                </div>
                {qty ? (
                  <div className="quantity-controls">
                    <span
                      onClick={() => handleDecrement(item, index)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      -
                    </span>
                    <span style={{ margin: "0 5px" }}>{qty}</span>
                    <span
                      onClick={() => handleIncrement(item, index)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    >
                      +
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => handleAddItem(item, index)}
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  >
                    +
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button onClick={checkOut} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};
export default Menu;
