import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "State/api";
import userReducers from "State/index"
import productReducers from "State/productSlice"

const store = configureStore({
  reducer: {
    users: userReducers,
    product: productReducers,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;