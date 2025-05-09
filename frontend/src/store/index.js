import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/CategorySlice";
import productReducer from "../features/ProductSlice";
import cartReducer from "../features/CartSlice";

// Konfigurasi store global
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
  // middleware tambahan bisa disisipkan di sini jika diperlukan
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});
