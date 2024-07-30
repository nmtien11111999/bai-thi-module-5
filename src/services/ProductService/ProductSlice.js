import {createSlice} from "@reduxjs/toolkit";
import {ListProduct} from "./ProductAxios";


const initialState = {
    products: []
};

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListProduct.fulfilled, (state, action) => {
                state.products = action.payload;
            });
    }
});

export default ProductSlice.reducer;
