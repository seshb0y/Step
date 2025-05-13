import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUsers, fetchAddUserData } from "../features/user/userSlice";
import Sidebar from "../components/StaticElements/Sidebar";
import TopBox from "../components/StaticElements/TopBox";
import LoadingScreen from "../components/LoadingScreen";
import { UserSearch } from "../components/Search/UserSearch";
import { User } from "../types/User";
import UserModal from "../components/Modals/UserModal";
import UserCreateModal from "../components/Modals/UserCreateModal";

export const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortUsers, setSortUsers] = useState<{ sortBy: string; descending: boolean }>({
    sortBy: "username",
    descending: false,
  });

  useEffect(() => {
    dispatch(fetchUsers(sortUsers));
  }, [dispatch, sortUsers]);

  useEffect(() => {
    if (selectedUser) {
      const updatedUser = users.find(u => u.email === selectedUser.email);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  }, [users, selectedUser]);

  const handleSort = (key: string) => {
    setSortUsers((prev) => ({
      sortBy: key,
      descending: prev.sortBy === key ? !prev.descending : false,
    }));
    dispatch(fetchUsers({ sortBy: key, descending: sortUsers.sortBy === key ? !sortUsers.descending : false }));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
    dispatch(fetchAddUserData({ email: user.email }));
  };

  const getRoleColor = (role: number): string => {
    return role === 0 ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300';
  };

  const getRoleText = (role: number): string => {
    return role === 0 ? "Администратор" : "Пользователь";
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <TopBox isExpanded={isSidebarExpanded} />

      <div
        className={`transition-all duration-300 mt-20 ${
          isSidebarExpanded ? "ml-[280px] w-[calc(100%-280px)]" : "ml-[100px] w-[calc(100%-100px)]"
        } h-[calc(100vh-80px)] overflow-y-auto`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingScreen title="Users" subtitle="Loading users data..." />
          </div>
        ) : error ? (
          <div className="px-6">
            <div className="bg-gradient-to-br from-red-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg p-4 shadow-xl">
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        ) : (
          <div className="px-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                Users
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-72">
                  <UserSearch onUserSelect={handleUserSelect} />
                </div>
                <button 
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-4 py-2 rounded-lg text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  + Add User
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[rgba(30,27,75,0.95)] to-[rgba(88,28,135,0.9)] backdrop-blur-sm rounded-lg overflow-hidden shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1),2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-purple-500/10">
              <table className="w-full">
                <thead>
                  <tr>
                    {[
                      { key: "userId", label: "ID", width: "100px" },
                      { key: "username", label: "Username", width: "200px" },
                      { key: "email", label: "Email", width: "250px" },
                      { key: "role", label: "Role", width: "150px" },
                      { key: "createdAt", label: "Created At", width: "150px" }
                    ].map(({ key, label, width }) => (
                      <th 
                        key={key}
                        onClick={() => handleSort(key)}
                        className="py-3 px-4 text-left text-white font-medium tracking-wide text-[0.95rem] cursor-pointer transition-all group sticky top-0 bg-[rgba(30,27,75,0.98)] border-b border-purple-500/20"
                        style={{ width }}
                      >
                        <div className="flex items-center gap-2">
                          {label}
                          <span className="text-purple-400/70 group-hover:text-purple-300 transition-colors">
                            {sortUsers.sortBy === key && (
                              sortUsers.descending ? '↓' : '↑'
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.userId} 
                      className="border-b border-purple-500/10 hover:bg-[rgba(139,92,246,0.1)] transition-all duration-200 cursor-pointer"
                      onClick={() => handleUserSelect(user)}
                    >
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">#{user.userId}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">{user.username}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">{user.email}</td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter">
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.userRole)}`}>
                          {getRoleText(user.userRole)}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-white/90 tracking-wide font-inter whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isUserModalOpen && selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => {
            setIsUserModalOpen(false);
            setSelectedUser(null);
          }} 
        />
      )}

      {isCreateModalOpen && (
        <UserCreateModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

export default Users;
