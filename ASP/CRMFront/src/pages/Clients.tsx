import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchClients } from "../features/clients/clientSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingSpinner from "../components/LoadingSpinner";

export const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sortOrder, setSortOrder] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "name",
    descending: false,
  });



  
  const handleSort = (key: string) => {
    setSortOrder((prev) => ({
      sortBy: key,
      descending: prev.sortBy === key ? !prev.descending : false,
    }));
    dispatch(fetchClients({ sortBy: key, descending: sortOrder.sortBy === key ? !sortOrder.descending : false }));
  };
  

  return (
    <div className="min-h-screen w-full bg-dark-bg text-white overflow-hidden">

      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-screen `}>
        <h1 className="text-2xl font-bold mb-4 ml-16">Clients</h1>

        <div className="flex gap-4 mb-4 ml-16 text-primary-purple">
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("id")}>Sort by Id</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("name")}>Sort by Name</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("email")}>Sort by Email</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("address")}>Sort by Address</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("createdAt")}>Sort by Created At</button>
        </div>

        <div className="overflow-x-auto ml-16">
          {loading ? (
            <LoadingSpinner/>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead >
                <tr className="bg-gray-900 text-primary-purple ">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-700 bg-dark-bg">
                    <td className="py-2 px-4">{client.id}</td>
                    <td className="py-2 px-4">{client.name}</td>
                    <td className="py-2 px-4">{client.email}</td>
                    <td className="py-2 px-4">{client.phone}</td>
                    <td className="py-2 px-4">{client.address}</td>
                    <td className="py-2 px-4">{new Date(client.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
