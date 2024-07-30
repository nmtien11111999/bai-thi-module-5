import {createSlice} from "@reduxjs/toolkit";
import {CreateOrder, ListOrder} from "./OrderAxios";


const inittial = {
    orders: []
}

const OrderSlice = createSlice({
    name: 'orders',
    initialState: inittial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListOrder.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(CreateOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload)
            })

    }
})

export default OrderSlice.reducer;