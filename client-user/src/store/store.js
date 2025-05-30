import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../Slices/orderSlice.js";
export const store = configureStore({
  reducer: {
    orders: orderSlice,
  },
});
