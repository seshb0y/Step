import { useContext, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AuthContext, useAuth } from "./context/AuthContext";
import { User } from "./types";
import "./App.css"

// Props Drilling

// Context
function App() {
  // const [user, setUser] = useState<User>({
  //   name: "Alice",
  //   age: 25,
  //   gender: "female",
  // });

  const context = useAuth();
  // console.log("context", context);
  return <>
    {context.token ? <Dashboard /> : <Login />}
  </>
}

export default App;
