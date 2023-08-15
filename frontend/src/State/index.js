import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cartItems: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
    },
    setCart: (state, action) => {
      const elementIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems =
        elementIndex === -1
          ? [...state.cartItems, { ...action.payload, quantity: 1 }]
          : [
              ...state.cartItems.slice(0, elementIndex),
              {
                ...state.cartItems[elementIndex],
                quantity: state.cartItems[elementIndex].quantity + 1,
              },
              ...state.cartItems.slice(elementIndex + 1),
            ];
    },
    deleteCartProduct: (state, action) => {
      const elementIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems = [
        ...state.cartItems.slice(0, elementIndex),
        ...state.cartItems.slice(elementIndex + 1),
      ];
    },
    decreaseCartProductQuantity: (state, action) => {
      const elementIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems =
        state.cartItems[elementIndex].quantity === 1
          ? [
              ...state.cartItems.slice(0, elementIndex),
              ...state.cartItems.slice(elementIndex + 1),
            ]
          : (state.cartItems = [
              ...state.cartItems.slice(0, elementIndex),
              {
                ...state.cartItems[elementIndex],
                quantity: state.cartItems[elementIndex].quantity - 1,
              },
              ...state.cartItems.slice(elementIndex + 1),
            ]);
    },
  },
});

export const { setLogin, setLogout, setCart, deleteCartProduct, decreaseCartProductQuantity } =
  authSlice.actions;
export default authSlice.reducer;
