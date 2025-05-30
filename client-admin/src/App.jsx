import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import AnalyticPage from "./components/AnalyticsPage/Analytics";
import TablesPage from "./components/Tables/Tables";
import OrdersPage from "./components/Orders/Orders";
import MenuPage from "./components/Menu/Menu";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [activeComp, setActiveComp] = useState("Analytics");
  const featureComp = [
    {
      name: "Analytics",
      comp: <AnalyticPage />,
    },
    {
      name: "Tables",
      comp: <TablesPage />,
    },
    {
      name: "Orders",
      comp: <OrdersPage />,
    },
    {
      name: "Menu",
      comp: <MenuPage />,
    },
  ];
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar activeComp={activeComp} setActiveComp={setActiveComp} />
        {featureComp.map((feature, index) => {
          if (feature.name === activeComp) {
            return (
              <div key={index} className="feature-comp">
                {feature.comp}
              </div>
            );
          }
        })}
      </div>
    </BrowserRouter>
  );
};
export default App;
