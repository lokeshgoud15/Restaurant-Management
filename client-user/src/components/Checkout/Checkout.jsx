import "./Checkout.css";
import { CiClock1, CiLocationOn, CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import InstructionPage from "../InstructionPage/InstructionPage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItems,
  DecrementAfterCheckout,
  IncrementAfterCheckout,
  RemoveItemAfterCheckout,
  setIsInstructionPage,
} from "../../Slices/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Checkout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(10);
  const { orderItems } = useSelector((store) => store.orders);
  const { isinstructionPageOn } = useSelector((store) => store.orders);
  const [swipeStartX, setSwipeStartX] = useState(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const swipeThreshold = 100;
  const maxSwipeDistance = 300;
  const dispatch = useDispatch();
  const [instructions, setInstructions] = useState("");
  const [noOfOccupants, setNoOfOccupants] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
  });
  const [address, setAddress] = useState("");
  const [orderType, setOrderType] = useState("dine in");
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredItems = orderItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const calculateDeliveryTime = (items) => {
    const baseTime = 10;
    const timeTakes = items?.reduce((acc, item) => {
      let itemTime = 0;
      const category = item?.category.toLowerCase();
      if (category.includes("pizza")) {
        itemTime = 15 * item.qty;
      } else if (category.includes("burger")) {
        itemTime = 10 * item.qty;
      } else if (category.includes("fries")) {
        itemTime = 5 * item.qty;
      }
      return acc + itemTime;
    }, baseTime);

    return timeTakes;
  };

  useEffect(() => {
    const updatedTime = calculateDeliveryTime(orderItems);
    setDeliveryTime(updatedTime);
  }, [orderItems]);

  const createOrder = async () => {
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price,
      0
    );
    let orderData = null;
    if (orderType === "dine in") {
      orderData = {
        customerDetails: customerDetails,
        Items: orderItems,
        address: address,
        totalPrice: totalPrice,
        orderType: orderType,
        cookingInstructions: instructions,
        expectedCompletion: deliveryTime,
        occupants: noOfOccupants,
      };
    }
    if (orderType === "take away") {
      orderData = {
        customerDetails: customerDetails,
        Items: orderItems,
        totalPrice: totalPrice,
        orderType: orderType,
        cookingInstructions: instructions,
        expectedCompletion: deliveryTime,
        occupants: 1,
      };
    }

    if (orderItems.length === 0) return toast.error("Please add items to cart");
    if (orderType === "dine in") {
      if (!customerDetails.name || !customerDetails.phone || !address)
        return toast.error("Please fill all the details");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      if (data?.success) {
        toast.success(data.message);
        dispatch(clearItems());
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  const handleTouchStart = (e) => {
    setSwipeStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (swipeStartX !== null) {
      let distance = e.touches[0].clientX - swipeStartX;
      if (distance > maxSwipeDistance) {
        distance = maxSwipeDistance;
      }
      setSwipeDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (swipeDistance >= swipeThreshold) {
      await createOrder();
    }
    setSwipeStartX(null);
    setSwipeDistance(0);
  };

  const handleIncrement = (item, index) => {
    dispatch(IncrementAfterCheckout({ item, index }));
  };

  const handleDecrement = (item, index) => {
    dispatch(DecrementAfterCheckout({ item, index }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={` ${
          isinstructionPageOn ? "blur-checkout-container" : "checkout-container"
        }`}
      >
        <div className="checkout-container-head">
          <h2>Good Evening</h2>
          <p>Place your Order here</p>
        </div>
        <div className="search-input">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {filteredItems?.map((item, index) => (
          <div key={index} className="checkout-container-items">
            <div className="checkout-container-item">
              <img src={item?.image} alt="" />
            </div>
            <div className="checkout-container-item-details">
              <div className="item-name">
                <h2>{item?.name}</h2>
                <p
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  onClick={() => dispatch(RemoveItemAfterCheckout(item, index))}
                >
                  X
                </p>
              </div>
              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                &#8377;{item?.price}
              </p>
              <div className="item-quantity">
                <div>{item?.key?.includes("pizza") && "14''"}</div>
                <div className="quantity-controls">
                  <span
                    onClick={() => handleDecrement(item, index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      border: "1px solid black",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    -
                  </span>
                  <span style={{ margin: "0 10px" }}>{item?.qty}</span>
                  <span
                    onClick={() => handleIncrement(item, index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      border: "1px solid black",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div onClick={() => dispatch(setIsInstructionPage(true))}>
          <p
            style={{
              width: "200px",
              fontSize: "12px",
              color: "grey",
              marginTop: "10px",
              borderBottom: "1px dashed black",
            }}
          >
            Add cooking instructions (optional)
          </p>
        </div>

        <div className="delivery-type">
          <button
            onClick={() => setOrderType("dine in")}
            className={`dine-btn ${
              orderType === "dine in" ? "active-btn" : ""
            }`}
          >
            Dine In
          </button>
          <button
            onClick={() => setOrderType("take away")}
            className={`takeaway-btn ${
              orderType === "take away" ? "active-btn" : ""
            }`}
          >
            Take Away
          </button>
        </div>

        <div className="total-price-container">
          <div className="price-calci">
            <div className="charges">
              <p>Item Total</p>
              <p>
                &#8377;{orderItems?.reduce((acc, item) => acc + item.price, 0)}
              </p>
            </div>
            <div className="charges">
              <p style={{ borderBottom: "1px dashed black" }}>Delivery Fee</p>
              <p>
                {orderItems?.length > 0 && orderType === "dine in"
                  ? "₹50"
                  : "₹0"}
              </p>
            </div>
            <div className="charges">
              <p>Taxes</p>
              <p>{orderItems?.length > 0 ? "₹30" : "₹0"}</p>
            </div>
          </div>
          <div className="grand-total">
            <p>Grand Total</p>
            <p>
              &#8377;
              {orderItems?.reduce(
                (acc, item) => acc + item.price,
                orderItems.length > 0 ? 80 : 0
              )}
            </p>
          </div>
        </div>

        <div className="details-container">
          <p>Your Details</p>
          <div className="details">
            <input
              value={customerDetails.name}
              type="text"
              placeholder="name"
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
            />

            <input
              value={customerDetails.phone}
              type="text"
              placeholder="phone"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>

        {orderType === "dine in" && (
          <div className="delivery-details">
            <div>
              <CiLocationOn style={{ marginRight: "10px" }} />
              Delivery at Home{"- "}
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="address-details"
                type="text"
                placeholder="Address"
              />
            </div>
            <div>
              <CiClock1 style={{ marginRight: "10px" }} />
              Delivery in {deliveryTime}
              min
            </div>
            <div>
              <label htmlFor="" style={{ marginRight: "10px" }}>
                No of People
              </label>
              <select
                value={noOfOccupants}
                onChange={(e) => setNoOfOccupants(e.target.value)}
                name=""
                id=""
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div
          className="swipe-to-order"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="swiping-arrow"
            style={{ transform: `translateX(${swipeDistance}px)` }}
          >
            <FaArrowRight />
          </div>
          <p>Swipe to Order</p>
        </div>
      </div>
      {isinstructionPageOn && (
        <div className="instruction-page">
          <InstructionPage
            instructions={instructions}
            setInstructions={setInstructions}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
};
export default Checkout;
