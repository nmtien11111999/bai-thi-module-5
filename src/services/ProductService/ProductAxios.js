import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const ApiURL = "http://localhost:3000/products";

export const ListProduct = createAsyncThunk('listProduct', async () => {
    const response = await axios.get(ApiURL);
    return response.data;
});
