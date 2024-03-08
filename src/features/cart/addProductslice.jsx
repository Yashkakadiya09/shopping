import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  status: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = { ...action.payload, quantity: 1 };
      state.cart.push(product);
    },

    incrementProduct(state, action) {
      const updatedData = state?.cart?.map((data, i) => {
        if (data?.id === action.payload) {
          data.quantity = data?.quantity + 1;
        }
        return data;
      });
      state.cart = updatedData;
    },
    reduceProduct(state, action) {
      const updatedData = state?.cart?.map((data, i) => {
        if (data?.id === action.payload) {
          data.quantity = data?.quantity - 1;
        }
        return data;
      });
      const fillter = updatedData.filter((data) => data.quantity > 0);
      state.cart = fillter;
    },
    removeProduct(state, action) {
      const remove = state?.cart?.filter((data) => data?.id !== action.payload);
      state.cart = remove;
    },
    orderPlaced(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  reduceProduct,
  incrementProduct,
  removeProduct,
  orderPlaced,
} = cartSlice.actions;

export default cartSlice.reducer;
