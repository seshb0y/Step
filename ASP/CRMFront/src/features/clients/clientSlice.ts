import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { Client } from "../../types/Client";

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  clientLoading: boolean;
  clientError: string | null;
  clientCreating: boolean;
  clientCreateError: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: true,
  error: null,
  clientLoading: false,
  clientError: null,
  clientCreating: false,
  clientCreateError: null,
};

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (email: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/Client/Delete/`, {data: {email: email} });
      return email;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete client");
    }
  }
);



export const fetchChangeClientData = createAsyncThunk(
  "clients/data/change",
  async ({ name, newEmail, oldEmail, address, phone }: { name: string; newEmail: string; oldEmail: string; address: string; phone: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Client/Change/`, { name, newEmail, oldEmail, address, phone });
      return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update client data");
    }
  }
);


export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async ({ sortBy, descending }: { sortBy?: string; descending?: boolean }) => {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (descending !== undefined) params.append("Descending", descending.toString());

    const response = await axiosInstance.get(`/Client/GetAllClients?${params.toString()}`);
    return response.data;
  }
);

export const fetchAddClientData = createAsyncThunk(
  "clients/load/client/data",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`Client/Load/Client/Data?email=${encodeURIComponent(email)}`);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load client data");
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (clientData: Omit<Client, "id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Client/Add/Client", clientData);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create client");
    }
  }
);

export const fetchClientsWithOrdersAndTasks = createAsyncThunk(
  "clients/fetchClientsWithOrdersAndTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Client/Get/Clients/With/Orders/And/Tasks");
      console.log(response.data)
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch clients with orders and tasks");
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = Array.isArray(action.payload.clients) ? action.payload.clients : [];
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchClientsWithOrdersAndTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsWithOrdersAndTasks.fulfilled, (state, action) => {
        state.clients = action.payload; 
        state.loading = false;
      })
      .addCase(fetchClientsWithOrdersAndTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAddClientData.pending, (state) => {
        state.clientLoading = true;
        state.clientError = null;
      })
      .addCase(fetchAddClientData.fulfilled, (state, action) => {
        const clientIndex = state.clients.findIndex(client => client.email === action.meta.arg.email);
        if (clientIndex !== -1) {
          state.clients[clientIndex] = {
            ...state.clients[clientIndex],
            orders: action.payload.orders || [],
            users: action.payload.users || []
          };
        }
        state.clientLoading = false;
      })
      .addCase(fetchAddClientData.rejected, (state, action) => {
        state.clientLoading = false;
        state.clientError = action.payload as string;
      })

      .addCase(fetchChangeClientData.pending, (state) => {
        state.clientLoading = true;
        state.clientError = null;
      })
      .addCase(fetchChangeClientData.fulfilled, (state, action) => {
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload; 
        }
        state.clientLoading = false;
      })
      .addCase(fetchChangeClientData.rejected, (state, action) => {
        state.clientLoading = false;
        state.clientError = action.payload as string;
      })

      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(client => client.email !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default clientsSlice.reducer;

