import {
    configureStore
} from "@reduxjs/toolkit"
import productsReducer from "./features/products/productsSlice";
import {
    productApi
} from "./services/productsApi";
import cartReducer from "./features/cart/cartSlice"; //cartSlice.reducer is imported as cartReducer


const store = configureStore({
    reducer: {
        products: productsReducer,
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),

})

export default store;