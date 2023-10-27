import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsReducer, { productsFetch } from "./productsSlice";
import { productsApi } from "./productsAPI";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());

export default store;
