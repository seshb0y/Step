import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StatsCard } from "../components/Dashboard/StatsCard";
import { NewDealsChart } from "../components/Dashboard/NewDealChart";
import { TasksStatusTable } from "../components/Dashboard/TasksInfoTable";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { getDashboardData } from "../features/dashboard/dashboardSlice";

export const Dashboard = () => {
  const { clientsAmount: contacts, ordersCount, ordersTotalAmount } = useSelector(
    (state: RootState) => state.dashboard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);
  

  return (
    <div className="w-screen h-screen bg-dark-bg text-white p-6">
      <h1 className="text-3xl font-bold text-primary-purple mb-6">Dashboard</h1>

      {/* Сетка дашборда */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Clients" value={contacts} change={-12} />
        <StatsCard title="Orders" value={ordersCount} change={-4} />
        <StatsCard title="Orders Amount" value={ordersTotalAmount} unit="$" change={-37} />
      </div>

      {/* График + Таблица */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <NewDealsChart />
        <TasksStatusTable />
      </div>
    </div>
  );
};

export default Dashboard;
