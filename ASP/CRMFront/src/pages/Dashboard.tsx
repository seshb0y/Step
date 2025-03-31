import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StatsCard } from "../components/Dashboard/StatsCard";
import { NewDealChart } from "../components/Dashboard/NewDealChart";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { getDashboardData } from "../features/dashboard/dashboardSlice";
import { TasksStatusTable } from "../components/Dashboard/TasksInfoTable";
import Sidebar from "../components/StaticElements/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchGetAllOrders } from "../features/orders/orderSlice";
import { checkAuth } from "../features/auth/authSlice";
import TopBox from "../components/StaticElements/TopBox";

export const Dashboard = () => {
  const { clientsAmount: contacts, ordersCount, ordersTotalAmount, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  const dispatch = useAppDispatch();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(checkAuth());
    dispatch(fetchGetAllOrders({}));
  }, [dispatch]);

  return (
    <div className="w-max h-screen bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div
        className={`transition-all duration-300 p-6 mt-20  ${
          isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"
        } w-screen`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-10 ml-16">
              <StatsCard title="Clients" value={contacts} change={-12} />
              <StatsCard title="Orders" value={ordersCount} change={-4} />
              <StatsCard title="Orders Amount" value={ordersTotalAmount} unit="$" change={-37} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pr-10 ml-16">
              <NewDealChart />
              <TasksStatusTable />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
