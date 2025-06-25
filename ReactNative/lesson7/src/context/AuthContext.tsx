import { createContext, ReactNode, useContext, useState } from "react";
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
interface Props {
  children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);
  return (
<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);