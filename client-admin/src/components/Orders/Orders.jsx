import { useEffect, useState } from "react";
import "./Orders.css";
import timer from "../../assets/time.png";
import done from "../../assets/done.png";
import spoon from "../../assets/spoon.png";
const Orders = () => {
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/tables/get-tables`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTables(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTables();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/orders/get-orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  const [ongoingTimes, setOngoingTimes] = useState([]);

  useEffect(() => {
    const calculateOngoingTimes = () => {
      const currentTimes = orders.map((order) => {
        const createdAt = new Date(order.createdAt).getTime();
        const currentTime = Date.now();
        return Math.floor((currentTime - createdAt) / 60000);
      });
      setOngoingTimes(currentTimes);
    };

    calculateOngoingTimes();

    const interval = setInterval(calculateOngoingTimes, 60000);

    return () => clearInterval(interval);
  }, [orders]);
  function formatTo12Hour(timeString) {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="orders-tab">
      <h2>Order Line</h2>
      <div className="orders">
        {orders?.map((order, index) => (
          <div
            key={index}
            className="each-order"
            style={{
              backgroundColor:
                order?.status === "served"
                  ? "#b9f8c9"
                  : order?.orderType?.toLowerCase() ===
                    "Dine in".toLocaleLowerCase()
                  ? "#ffe3bc"
                  : "#c2d4d9",
            }}
          >
            <div className="order-details">
              <div className="order-details-left">
                <div className="order-id-part">
                  <img src={spoon} alt="" />
                  <p className="order-id" style={{ fontSize: "18px" }}>
                    #{order?._id?.slice(20)}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p>
                    {order?.orderType?.toLocaleLowerCase() === "dine in"
                      ? tables?.find(
                          (table) => table._id === order.tableDetails
                        )?.name
                      : "take away"}
                  </p>
                  <p>{formatTo12Hour(order?.createdAt)} </p>
                </div>
                <p style={{ fontSize: "14px" }}>
                  {order?.orderItems?.length} Items
                </p>
              </div>
              <div
                className="order-details-right"
                style={{
                  backgroundColor:
                    order?.status === "served"
                      ? "#b9f8c9"
                      : order?.orderType?.toLowerCase() ===
                        "Dine in".toLocaleLowerCase()
                      ? "#ffe3bc"
                      : "#c2d4d9",
                }}
              >
                <p
                  style={{
                    color:
                      order?.status?.toLocaleLowerCase() === "served"
                        ? "green"
                        : order?.orderType?.toLocaleLowerCase() === "take away"
                        ? "#3181A3"
                        : "orange",
                  }}
                >
                  {order?.status === "served"
                    ? "Done "
                    : order?.orderType?.toUpperCase()}
                </p>
                {order?.status === "processing" &&
                order?.orderType === "dine in" ? (
                  <p>Ongoing {ongoingTimes[index]} min</p>
                ) : order?.status === "served" ? (
                  <p>Served</p>
                ) : order?.orderType === "take away" ? (
                  <p>Not picked up</p>
                ) : (
                  <p>Unknown status</p>
                )}
              </div>
            </div>
            <div className="order-items">
              <h2>1 x Value Set Meals</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "8.5px",
                  paddingLeft: "30px",
                }}
                className="items-list"
              >
                {order?.orderItems?.map((item, index) => (
                  <p key={index}>
                    {item?.qty}
                    {" x "}
                    {item?.name}
                  </p>
                ))}
              </div>
            </div>
            <div
              className="order-status"
              style={{
                backgroundColor:
                  order?.status === "served"
                    ? "#31ff65"
                    : order?.orderType?.toLowerCase() ===
                      "Dine in".toLocaleLowerCase()
                    ? "#fdc474"
                    : "#9baeb3",
              }}
            >
              {order?.status === "served" ||
              order?.OrderType === "take away" ? (
                <span style={{ color: order?.status === "served" && "black" }}>
                  order done
                </span>
              ) : (
                <span>processing</span>
              )}

              {order?.status?.toLowerCase() === "processing" ? (
                <img src={timer} alt="" />
              ) : (
                <img src={done} alt="" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
