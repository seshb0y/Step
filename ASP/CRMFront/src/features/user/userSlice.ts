import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const confirmEmail = createAsyncThunk("account/confirmEmail", async ({username} : {username : string}) => {
    const response = await axiosInstance.post("/Account/ConfirmEmail", {username});
    console.log(response.data)
    return response.data;
});

  
interface UserState {
username: null | string
}

const initialState: UserState = {
username: null
};

const userSlice : UserState = createSlice({
name: 'user',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder
    .addCase(confirmEmail())
}
}
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;