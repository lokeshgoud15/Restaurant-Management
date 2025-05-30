import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./DB.js";
import orderRoutes from "./routes/order.routes.js";
import tableRouter from "./routes/table.routes.js";
import chefRouter from "./routes/chef.routes.js";
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
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
  console.log("server is ready at port 8000");
  connectDB();
});
