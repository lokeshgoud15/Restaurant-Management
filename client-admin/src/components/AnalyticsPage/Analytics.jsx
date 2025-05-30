import "./Analytics.css";
import chef from "../../assets/chefs.png";

import clients from "../../assets/clients.png";
import { FaRupeeSign } from "react-icons/fa";
import totalorders from "../../assets/totalorders.png";
import revenuecover from "../../assets/revenuecover.png";
import { useEffect } from "react";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceArea,
} from "recharts";
import { LinearProgress, Box, Typography } from "@mui/material";
import { useMemo } from "react";
import moment from "moment";

const Analytics = () => {
  const [chefs, setChefs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [tables, setTables] = useState([]);
  const [dineinOrders, setDineInOrders] = useState([]);
  const [takeAwayOrders, setTakeAwayOrders] = useState([]);
  const [servedOrders, setServedOrders] = useState([]);
  const [orderSummaryPeriod, setOrderSummaryPeriod] = useState("Daily");
  const [revenuePeriod, setRevenuePeriod] = useState("Daily");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/tables/get-tables`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setTables(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTables();
  }, []);
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/chefs/get-chefs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setChefs(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/orders/get-orders`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setOrders(data);
        let rev = data?.reduce((acc, item) => acc + item.totalPrice, 0);

        setRevenue(rev);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    fetchChefs();
  }, []);
  useEffect(() => {
    if (orders && orders.length > 0) {
      const clientsData = [
        ...new Set(orders.map((order) => order.customerDetails.phone)),
      ];
      setUniqueClients(clientsData);
    }
  }, [orders]);
  useEffect(() => {
    const dineInOrders = orders?.filter(
      (order) => order?.orderType?.toLowerCase() === "Dine In".toLowerCase()
    );
    setDineInOrders(dineInOrders);
    const takeAwayOrders = orders?.filter(
      (order) => order?.orderType?.toLowerCase() === "Take Away".toLowerCase()
    );
    setTakeAwayOrders(takeAwayOrders);
    const servedOrders = orders?.filter((order) => order?.status === "served");
    setServedOrders(servedOrders);
  }, [orders]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  const getFilteredOrders = (period) => {
    const now = moment();
    return orders?.filter((order) => {
      const createdAt = moment(order.createdAt);
      switch (period) {
        case "Daily":
          return createdAt.isSame(now, "day");
        case "Weekly":
          return createdAt.isSame(now, "week");
        case "Monthly":
          return createdAt.isSame(now, "month");
        case "Yearly":
          return createdAt.isSame(now, "year");
        default:
          return true;
      }
    });
  };

  const filteredOrders = useMemo(
    () => getFilteredOrders(orderSummaryPeriod),
    [orders, orderSummaryPeriod]
  );

  const filteredDineIn = filteredOrders?.filter(
    (order) => order.orderType?.toLowerCase() === "dine in"
  );
  const filteredTakeAway = filteredOrders?.filter(
    (order) => order.orderType?.toLowerCase() === "take away"
  );
  const filteredServed = filteredOrders?.filter(
    (order) => order.status === "served"
  );

  const chartData = [
    { name: "Take Away", value: filteredTakeAway.length },
    { name: "Served", value: filteredServed.length },
    { name: "Dine In", value: filteredDineIn.length },
  ];

  const dailyRevenueData = useMemo(() => {
    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let filtered = getFilteredOrders(revenuePeriod);

    const revenueByDay = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    filtered?.forEach((order) => {
      const day = dayMap[new Date(order.createdAt).getDay()];
      if (revenueByDay[day] !== undefined) {
        revenueByDay[day] += order.totalPrice;
      }
    });

    return Object.keys(revenueByDay).map((day) => ({
      day,
      value: revenueByDay[day],
    }));
  }, [orders, revenuePeriod]);

  return (
    <div className="analytics-tab">
      <div className="filter-analytics">
        <input className="filter-input" type="text" placeholder="Filter..." />
        <div className="filter-icon">
          <select className="filter-select" name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>

      <div className="analytics">
        <h2>Analytics</h2>

        <div className="overall-analytics">
          <div className="each-section">
            <div className="section-icon">
              <img src={chef} alt="" />
            </div>
            <div className="section-details">
              <p>{chefs?.length}</p>
              <p>TOTAL CHEF</p>
            </div>{" "}
          </div>
          <div className="each-section">
            <div className="section-icon" style={{ position: "relative" }}>
              {" "}
              <img src={revenuecover} alt="" />
              <FaRupeeSign
                style={{ position: "absolute", top: "15px", right: "25px" }}
                size={"24px"}
              />
            </div>
            <div className="section-details">
              <p>{revenue > 1000 ? revenue / 1000 + "K" : revenue}</p>
              <p>TOTAL REVENUE</p>
            </div>
          </div>
          <div className="each-section">
            <div className="section-icon">
              {" "}
              <img src={totalorders} alt="" />
            </div>
            <div className="section-details">
              <p>{orders?.length}</p>
              <p>TOTAL ORDERS</p>
            </div>
          </div>
          <div className="each-section">
            <div className="section-icon">
              {" "}
              <img src={clients} alt="" />
            </div>
            <div className="section-details">
              <p>{uniqueClients?.length}</p>
              <p>TOTAL CLIENTS</p>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart1">
            <div className="order-summary">
              <div className="summary-left">
                <h2>Order-Summary</h2>
                <p>djfksjdbfbsfsjbsbgbdfubgdfbgd</p>
              </div>
              <div className="summary-right">
                <select
                  className="select-period"
                  value={orderSummaryPeriod}
                  onChange={(e) => setOrderSummaryPeriod(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="overall-orders-summary">
              <div className="orderX">
                <p>{filteredServed?.length}</p>
                <p>Served</p>
              </div>
              <div className="orderX">
                <p>{filteredDineIn?.length}</p>
                <p>Dine in</p>
              </div>
              <div className="orderX">
                <p>{filteredTakeAway?.length}</p>
                <p>Take Away</p>
              </div>
            </div>

            <div
              className="chart-container"
              style={{
                width: "420px",
                height: "170px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="progress-bars" style={{ marginTop: "10px" }}>
                {chartData.map((data, index) => (
                  <Box key={index} mb={1}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "12px" }}
                      gutterBottom
                    >
                      {data.name} (
                      {((data.value / orders.length) * 100).toFixed(1)}%)
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(data.value / orders.length) * 100}
                      style={{
                        backgroundColor: "#eee",
                        height: "6px", // Adjust the height of the progress bar
                      }}
                      color="primary"
                    />
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <div className="chart2">
            <div className="revenue-summary">
              <div className="summary-left">
                <h2>Revenue</h2>
                <p>djfksjdbfbsfsjbsbgbdfubgdfbgd</p>
              </div>
              <div className="summary-right">
                <select
                  className="select-period"
                  value={revenuePeriod}
                  onChange={(e) => setRevenuePeriod(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div
              className="line-chart-wrapper"
              style={{ width: "390px", height: "230px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyRevenueData}>
                  <ReferenceArea
                    x1="Sat"
                    x2="Sat"
                    stroke="none"
                    fill="#ddd"
                    fillOpacity={0.4}
                  />
                  <XAxis
                    dataKey="day"
                    interval={0}
                    scale="point"
                    padding={{ left: 20, right: 20 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#111"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart3">
            <div className="table-summary">
              <div className="summary-left">
                <h2>Tables</h2>
              </div>
              <div
                className="summary-right"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input type="radio" defaultChecked />
                  <label htmlFor="">Available</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input type="radio" disabled />
                  <label htmlFor="">Served</label>
                </div>
              </div>
            </div>

            <div className="tables-in-analytics">
              {tables?.map((table, index) => (
                <div
                  className={`table-in-analytics ${
                    orders?.some((o) => o.tableDetails === table._id)
                      ? ""
                      : "unbooked"
                  }`}
                  key={index}
                >
                  <div className="each-table-in-analytics">
                    <p>{table?.name?.slice(0, 6) || "No Name"}</p>
                    <span>
                      {Number(table?.name?.slice(6, 9)) < 10
                        ? 0 + table?.name?.slice(6, 10)
                        : table?.name?.slice(6, 9) || ""}
                    </span>
                
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <colgroup>
              <col style={{ width: "33%" }} />
              <col style={{ width: "67%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Chef Name</th>
                <th>Order Taken</th>
              </tr>
            </thead>
            <tbody>
              {chefs?.map((chef, index) => (
                <tr key={index}>
                  <td>{chef?.name}</td>
                  <td>{chef?.ordersAssigned?.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
