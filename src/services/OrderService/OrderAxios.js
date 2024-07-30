import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const ApiURL = "http://localhost:3000/orders";

export const ListOrder = createAsyncThunk('listOrder', async () => {
    const response = await axios.get(ApiURL);
    return response.data;
})

export const CreateOrder = createAsyncThunk('createOrder', async (order) => {
    const response = await axios.post(ApiURL, order);
    return response.data;
})
