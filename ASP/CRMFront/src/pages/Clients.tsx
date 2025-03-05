import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchClients } from "../features/clients/clientsSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";

export const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchClients("name")); // По умолчанию сортируем по имени
  }, [dispatch]);

  const handleSort = (key: string) => {
    dispatch(fetchClients(key)); // Отправляем запрос с новым параметром сортировки
  };

  return (
    <div className="w-max h-screen bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-screen`}>
        <h1 className="text-2xl font-bold mb-4 ml-16">Clients</h1>

        {/* Кнопки сортировки */}
        <div className="flex gap-4 mb-4 ml-16">
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={() => handleSort("name")}>Sort by Name</button>
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={() => handleSort("email")}>Sort by Email</button>
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={() => handleSort("phone")}>Sort by Phone</button>
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={() => handleSort("address")}>Sort by Address</button>
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={() => handleSort("createdAt")}>Sort by Created At</button>
        </div>

        {/* Таблица клиентов */}
        <div className="overflow-x-auto ml-16">
          {loading ? (
            <p>Loading clients...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
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
                  <tr key={client.id} className="border-b border-gray-700">
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
