import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data.user;
});


export const loginUser = createAsyncThunk<string,{ username: string; password: string }>(
  "auth/login",
  async ({ username, password }) => {
    const response = await axiosInstance.post("/auth/Login", { username, password });
    return response.data;
  }
);


export const logoutUser = createAsyncThunk("auth/Logout", async () => {
  await axiosInstance.post("/auth/logout");
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    isAuthenticated: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
