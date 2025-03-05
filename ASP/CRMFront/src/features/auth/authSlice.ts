import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { use } from "react";
import { User } from "../../types/User";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// interface User {
//   id: string,
//   name: string,
//   role: string,
// };

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axiosInstance.get("/Account/me");
  console.log(response.data)
  return response.data;
});


export const loginUser = createAsyncThunk<User,{ username: string; password: string }>(
  "auth/login",
  async ({ username, password }) => {
    const response = await axiosInstance.post("/Auth/Login", { username, password });
    console.log(response.data)
    return response.data;
  }
);


export const logoutUser = createAsyncThunk("Auth/Logout", async () => {
  await axiosInstance.post("/Auth/Logout");
});


localStorage.setItem("isLogin", JSON.stringify("false"));
const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("isLogin"),
  loading: false,
};





const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("isLogin", JSON.stringify("true") );
        console.log("User saved:", action.payload);
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
        localStorage.removeItem("user");
        localStorage.removeItem("isLogin");
    });
    
  },
});

export default authSlice.reducer;
