import { useEffect, useState } from "react";
import "./Tables.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import chair from "../../assets/chair.png";
import { toast, ToastContainer } from "react-toastify";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [isaddNewTable, setIsaddNewTable] = useState(false);
  const [newTable, setNewTable] = useState({
    name: "",
    noOfSeats: 1,
  });
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

  const createNewTable = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/tables/create-table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      });
      const data = await res.json();
      if (data && data._id) {
        setTables((prevTables) => [...prevTables, newTable]);
      }
      toast.success(data.message);
      setIsaddNewTable(false);
      setNewTable({ name: "", noOfSeats: 1 });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTable = async (table) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/tables/delete-table/${table?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      if (res.ok) {
        setTables(tables.filter((t) => t._id !== table._id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
  });

  return (
    <div className="tables-tab">
      <div className="search-tables">
        <div className="search-icon"></div>
        <input className="search-input" type="text" placeholder="Search" />
      </div>

      <div className="tables">
        <p>Tables</p>
        <div className="tables-list">
          {tables?.map((table, index) => (
            <div
              className={`table ${
                orders?.some((o) => o.tableDetails === table._id) && "booked"
              }`}
              key={index}
            >
              <div className="each-table">
                <p>{table?.name?.slice(0, 6) || "No Name"}</p>
                <span>
                  {Number(table?.name?.slice(6, 9)) < 10
                    ? 0 + table?.name?.slice(6, 10)
                    : table?.name?.slice(6, 9) || ""}
                </span>
                <div className="chairs">
                  <img src={chair} alt="" />
                  <span>{table?.noOfSeats || 0}</span>
                </div>
              </div>
              <div
                className={`delete-icon ${
                  orders?.some((o) => o.tableDetails === table._id) && "booked1"
                }`}
              >
                <MdOutlineDeleteForever
                  size={20}
                  onClick={() => deleteTable(table)}
                />
              </div>
            </div>
          ))}

          <div onClick={() => setIsaddNewTable(true)} className="add-table">
            <p>+</p>

            {isaddNewTable && (
              <div className="add-table-modal">
                <p className="table-name-head">Table name (optional)</p>
                <div>
                  <input
                    className="table-name"
                    type="text"
                    placeholder={tables.length + 1}
                    value={newTable.name}
                    onChange={(e) =>
                      setNewTable({ ...newTable, name: e.target.value })
                    }
                  />
                </div>{" "}
                <div>
                  <label htmlFor="">Chair</label>
                  <select
                    name="Chairs"
                    id=""
                    value={newTable.noOfSeats}
                    onChange={(e) =>
                      setNewTable({ ...newTable, noOfSeats: e.target.value })
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <button onClick={createNewTable} className="add-table-btn">
                  Create
                </button>
                <p
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "5px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsaddNewTable(false);
                  }}
                >
                  X
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Tables;
