import "./App.css";
import MenuItems from "./components/MenuItems/MenuItems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuItems />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
