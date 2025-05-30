import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderItems: [],
    orderType: "",
    isinstructionPageOn: false,
  },
  reducers: {
    setIsInstructionPage: (state, action) => {
      state.isinstructionPageOn = action.payload;
    },
    addItem: (state, action) => {
      const { item, index } = action.payload;
      const key = `${item.name}_${index}`;
      const idx = state.orderItems.findIndex((i) => i.key === key);
      const itemPrice = Number(item.price);
      if (idx === -1) {
        state.orderItems.push({
          key,
          name: item.name,
          qty: 1,
          image: item.image,
          price: itemPrice,
          originalPrice: itemPrice,
          category: item.category,
        });
      } else {
        state.orderItems[idx].qty += 1;
        state.orderItems[idx].price += state.orderItems[idx].originalPrice;
      }
    },
    incrementItem: (state, action) => {
      const { item, index } = action.payload;
      const key = `${item.name}_${index}`;
      const idx = state.orderItems.findIndex((i) => i.key === key);
      if (idx !== -1) {
        state.orderItems[idx].qty += 1;
        state.orderItems[idx].price += state.orderItems[idx].originalPrice;
      } else {
        const itemPrice = Number(item.price);
        state.orderItems.push({
          key,
          name: item.name,
          qty: 1,
          image: item.image,
          price: itemPrice,
          originalPrice: itemPrice,
        });
      }
    },
    decrementItem: (state, action) => {
      const { item, index } = action.payload;
      const key = `${item.name}_${index}`;
      const idx = state.orderItems.findIndex((i) => i.key === key);
      if (idx !== -1) {
        state.orderItems[idx].qty -= 1;
        state.orderItems[idx].price -= state.orderItems[idx].originalPrice;
        if (state.orderItems[idx].qty <= 0) {
          state.orderItems.splice(idx, 1);
        }
      }
    },
    addOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },
    addOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    IncrementAfterCheckout: (state, action) => {
      const { item } = action.payload;
      const idx = state.orderItems.findIndex((i) => i.name === item.name);
      if (idx !== -1) {
        state.orderItems[idx].qty += 1;
        state.orderItems[idx].price += state.orderItems[idx].originalPrice;
      } else {
        const itemPrice = Number(item.price);
        state.orderItems.push({
          name: item.name,
          qty: 1,
          image: item.image,
          price: itemPrice,
          originalPrice: itemPrice,
        });
      }
    },
    DecrementAfterCheckout: (state, action) => {
      const { item } = action.payload;
      const idx = state.orderItems.findIndex((i) => i.name === item.name);
      if (idx !== -1) {
        state.orderItems[idx].qty -= 1;
        state.orderItems[idx].price -= state.orderItems[idx].originalPrice;
        if (state.orderItems[idx].qty <= 0) {
          state.orderItems.splice(idx, 1);
        }
      }
    },
    RemoveItemAfterCheckout: (state, action) => {
      const { name } = action.payload;
      const idx = state.orderItems.findIndex((i) => i.name === name);
      if (idx !== -1) {
        state.orderItems.splice(idx, 1);
      }
    },
    clearItems: (state) => {
      state.orderItems = [];
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  addOrderItems,
  clearItems,
  setIsInstructionPage,
  addOrderType,
  IncrementAfterCheckout,
  DecrementAfterCheckout,
  RemoveItemAfterCheckout,
} = orderSlice.actions;
export default orderSlice.reducer;
