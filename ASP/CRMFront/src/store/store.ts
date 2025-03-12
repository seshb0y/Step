import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice"
import clientsReducer from "../features/clients/clientSlice"
import ordersReducer from "../features/orders/orderSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    clients: clientsReducer,
    orders: ordersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

