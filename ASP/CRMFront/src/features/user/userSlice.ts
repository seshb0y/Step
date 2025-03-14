import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { User, UserRole } from "../../types/User";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  userLoading: boolean;
  userError: string | null;
  userCreating: boolean;
  userCreateError: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: true,
  error: null,
  userLoading: false,
  userError: null,
  userCreating: false,
  userCreateError: null,
};

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (email: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/User/delete/`, {data: {email: email} });
      return email;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);



export const fetchChangeUserData = createAsyncThunk(
  "users/data/change",
  async ({ username, newEmail, oldEmail, role }: { username: string; newEmail: string; oldEmail: string; role: UserRole }, { rejectWithValue }) => {
    try {
      console.log(username, newEmail, oldEmail, role)
      const response = await axiosInstance.put(`/User/change/`, { username, newEmail, oldEmail, role });
      return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update user data");
    }
  }
);


export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ sortBy, descending }: { sortBy?: string; descending?: boolean }) => {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (descending !== undefined) params.append("Descending", descending.toString());
    const response = await axiosInstance.get(`/User/all?${params.toString()}`);
    console.log(response.data)
    return response.data;
  }
);

export const fetchAddUserData = createAsyncThunk(
  "user/load/client/data",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`User/load/data?email=${encodeURIComponent(email)}`);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load user data");
    }
  }
);

export const createUser = createAsyncThunk(
    "users/create",
    async (userData: { username: string; password: string; email: string; confirmPassword: string }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/Account/Register", userData);
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to create user");
      }
    }
  );

// export const fetchClientsWithOrdersAndTasks = createAsyncThunk(
//   "clients/fetchClientsWithOrdersAndTasks",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/Client/Get/Clients/With/Orders/And/Tasks");
//       console.log(response.data)
//       return response.data;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch clients with orders and tasks");
//     }
//   }
// );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = Array.isArray(action.payload.users) ? action.payload.users : [];
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    //   .addCase(fetchClientsWithOrdersAndTasks.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchClientsWithOrdersAndTasks.fulfilled, (state, action) => {
    //     state.users = action.payload; 
    //     state.loading = false;
    //   })
    //   .addCase(fetchClientsWithOrdersAndTasks.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })

      .addCase(fetchAddUserData.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchAddUserData.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(user => user.email === action.meta.arg.email);
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            orders: action.payload.orders || [],
            clients: action.payload.clients || []
          };
        }
        state.userLoading = false;
      })
      .addCase(fetchAddUserData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
      })

      .addCase(fetchChangeUserData.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchChangeUserData.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.userId === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
        state.userLoading = false;
      })
      .addCase(fetchChangeUserData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.email !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
        state.users[-1].isEmailConfirmed = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
});

export default usersSlice.reducer;

