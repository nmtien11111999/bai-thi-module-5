import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice";
import productReducer from "../ProductService/ProductSlice";


const store = configureStore({
    reducer: {
        orders: orderReducer,
        products: productReducer
    }
});

export default store;
