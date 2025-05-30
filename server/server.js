const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./DB");
const orderRoutes = require("./routes/order.routes");
const tableRouter = require("./routes/table.routes");
const chefRouter = require("./routes/chef.routes");

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["https://restaurant-management-user.vercel.app", "https://restaurant-management-user-git-main-lokeshs-projects-f594ae13.vercel.app","https://restaurant-management-lyart-seven.vercel.app","https://restaurant-management-git-main-lokeshs-projects-f594ae13.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRoutes);
app.use("/tables", tableRouter);
app.use("/chefs", chefRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is ready at port", PORT);
  connectDB();
});
