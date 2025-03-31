import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUsers } from "../features/user/userSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingSpinner from "../components/LoadingSpinner";
import UserModal from "../components/Modals/UserModal";
import UserCreateModal from "../components/Modals/UserCreateModal";
import { User } from "../types/User";

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "id",
    descending: false,
  });

  useEffect(() => {
    dispatch(fetchUsers({ sortBy: sortOrder.sortBy, descending: sortOrder.descending }));
  }, [dispatch, sortOrder]);

  const openCreateUserModal = () => {
    setIsCreateModalOpen(true);
  };

  console.log(users)
  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleSort = (key: string) => {
    setSortOrder((prev) => ({
      sortBy: key,
      descending: prev.sortBy === key ? !prev.descending : false,
    }));
    dispatch(fetchUsers({ sortBy: key, descending: sortOrder.sortBy === key ? !sortOrder.descending : false }));
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox />

      <div className={`transition-all duration-300 p-6 mt-20 ${isSidebarExpanded ? "ml-[200px]" : "ml-[0px]"} w-screen`}>
        <h1 className="text-2xl font-bold mb-4 ml-16">Users</h1>

        <div className="flex gap-4 mb-4 ml-16">
          <button className="bg-primary-purple px-4 py-2 rounded text-white" onClick={openCreateUserModal}>
            + Add User
          </button>
        </div>

        {/* Кнопки сортировки */}
        <div className="flex gap-4 mb-4 ml-16 text-primary-purple">
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("id")}>Sort by Id</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("userName")}>Sort by Username</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("isEmailConfirmed")}>Sort by confirmed email</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("email")}>Sort by Email</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("role")}>Sort by Role</button>
          <button className="bg-gray-900 px-4 py-2 rounded" onClick={() => handleSort("createdat")}>Sort by Created At</button>
        </div>

        <div className="overflow-x-auto ml-16">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-primary-purple">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Username</th>
                  <th className="py-2 px-4">Confirmed Email</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId} className="border-b border-gray-700 bg-dark-bg hover:bg-gray-700 cursor-pointer"
                      onClick={() => openUserModal(user)}>
                    <td className="py-2 px-4 text-center">{user.userId}</td>
                    <td className="py-2 px-4 text-center">{user.username}</td>
                    <td className="py-2 px-4 text-center">{user.isEmailConfirmed.toString()}</td>
                    <td className="py-2 px-4 text-center">{user.email}</td>
                    <td className="py-2 px-4 text-center">{user.role === 0 ? 'Admin' : 'Manager'}</td>
                    <td className="py-2 px-4 text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)} />}
      {isUserModalOpen && selectedUser !== null && <UserModal user={selectedUser} onClose={() => setIsUserModalOpen(false)} />}
    </div>
  );
};

export default UsersPage;
