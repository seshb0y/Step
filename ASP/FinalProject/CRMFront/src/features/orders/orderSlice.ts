import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { CreateOrder, Order, OrderStatus } from "../../types/Order";
import { toast } from 'react-toastify';

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
      toast.success('Заказ успешно удален');
      return orderId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data || "Ошибка при удалении заказа");
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

export const fetchChangeOrderData = createAsyncThunk(
  "order/data/change",
  async (request: { 
    totalAmount: number; 
    status: number; 
    orderId: number;
  }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Order/change`, request);
      toast.success('Данные заказа успешно обновлены');
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: unknown } };
      const errorMessage = typeof err.response?.data === 'string' 
        ? err.response.data 
        : "Ошибка при обновлении данных заказа";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
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
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: Omit<CreateOrder, "id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Order/add", orderData);
      toast.success('Заказ успешно создан');
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data || "Ошибка при создании заказа");
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  }
);

export const fetchAssignUserToOrder = createAsyncThunk(
  "order/assign-user",
  async ({ orderId, userId }: { orderId: number; userId: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Order/${orderId}/assign-user`, { userId });
      toast.success('Пользователь успешно назначен');
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: string } };
      toast.error(err.response?.data || "Ошибка при назначении пользователя");
      return rejectWithValue(err.response?.data || "Failed to assign user");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrderRealtime: (state, action) => {
      const exists = state.orders.find(order => order.orderId === action.payload.orderId);
      if (!exists) {
        state.orders.push(action.payload);
      }
    },
    changeOrderRealtime: (state, action) => {
      const index = state.orders.findIndex(order => order.orderId === action.payload.orderId);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrderRealtime: (state, action) => {
      state.orders = state.orders.filter(order => order.orderId !== action.payload.orderId);
    }
  },
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

      .addCase(createOrder.pending, (state) => {
        state.orderCreating = true;
        state.orderCreateError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.orderCreating = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderCreating = false;
        state.orderCreateError = action.payload as string;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.orderId !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchAssignUserToOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchAssignUserToOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.orderId === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.orderLoading = false;
      })
      .addCase(fetchAssignUserToOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      });
  },
});

export const { addOrderRealtime, changeOrderRealtime, deleteOrderRealtime } = ordersSlice.actions;
export default ordersSlice.reducer;

