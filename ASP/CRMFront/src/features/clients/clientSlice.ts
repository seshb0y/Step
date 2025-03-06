import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
    "clients/fetchClients",
    async ({ sortBy, descending }: { sortBy?: string; descending?: boolean }) => {
      const params = new URLSearchParams();
      if (sortBy) params.append("sortBy", sortBy);
      if (descending !== undefined) params.append("Descending", descending.toString());
  
      const response = await axiosInstance.get(`/Client/GetAllClients?${params.toString()}`);
      
      console.log("API Response:", response.data);
      console.log("Is array?", Array.isArray(response.data)); // Проверяем, массив ли это
  
      return response.data;
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
        console.log("Data received in Redux:", action.payload);
      
        state.clients = Array.isArray(action.payload.clients) ? action.payload.clients : []; // Берём массив внутри объекта
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch clients";
      });
  },
});

export default clientsSlice.reducer;
