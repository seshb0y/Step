import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { Order, OrderStatus } from "../../types/Order";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
  orderCreating: boolean;
  orderCreateError: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: true,
  error: null,
  orderLoading: false,
  orderError: null,
  orderCreating: false,
  orderCreateError: null,
};

export const deleteOrder = createAsyncThunk(
  "Order/delete",
  async (orderId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/Order/delete/`, {data: {orderId: orderId} });
      return orderId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);



export const fetchChangeOrderData = createAsyncThunk(
  "order/data/change",
  async ({ totalAmount, status, orderId }: { totalAmount: string; status: OrderStatus; orderId: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Order/change/`, { totalAmount, status, orderId });
      return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update order data");
    }
  }
);


export const fetchGetAllOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ sortBy, descending }: { sortBy?: string; descending?: boolean }) => {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (descending !== undefined) params.append("Descending", descending.toString());

    const response = await axiosInstance.get(`/Order/all/sorted?${params.toString()}`);
    console.log(response.data)
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: Omit<Order, "id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Order/add", orderData);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetAllOrders.fulfilled, (state, action) => {
        state.orders = Array.isArray(action.payload.orders) ? action.payload.orders : [];
        state.loading = false;
      })
      .addCase(fetchGetAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchChangeOrderData.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchChangeOrderData.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.orderId === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload; 
        }
        state.orderLoading = false;
      })
      .addCase(fetchChangeOrderData.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.orderId !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;

