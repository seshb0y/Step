import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchGetFood = createAsyncThunk('foodSpin/fetchGetFood', async () => {
    const response = await axios.get('https://678a47e1dd587da7ac2977c2.mockapi.io/users/food');
    return response.data
})
