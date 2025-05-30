import "./Sidebar.css";
import Menu from "../../assets/Menu.png";
import Orders from "../../assets/Orders.png";
import Tables from "../../assets/Tables.png";
import Analytics from "../../assets/Analytics.png";

const Sidebar = ({ activeComp, setActiveComp }) => {
  return (
    <div className="sidebar">
      <div className="app-icon"></div>
      <div className="app-features">
        <div className="features">
          <div
            className="feature-icon"
            onClick={() => setActiveComp("Analytics")}
          >
            <img src={Analytics} alt="" />
          </div>
          <div className="feature-icon" onClick={() => setActiveComp("Tables")}>
            <img src={Tables} alt="" />
          </div>
          <div className="feature-icon" onClick={() => setActiveComp("Orders")}>
            <img src={Orders} alt="" />
          </div>
          <div className="feature-icon" onClick={() => setActiveComp("Menu")}>
            <img src={Menu} alt="" />
          </div>
        </div>
        <div className="profile-icon"></div>
      </div>
    </div>
  );
};
export default Sidebar;
