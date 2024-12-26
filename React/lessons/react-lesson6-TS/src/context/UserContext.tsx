import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { useAuth } from "./AuthContext";

type UserContextType = {
    user: User | null;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error ("Context should be within Provider")
    }
    return context
}





interface Props {
    children: React.ReactNode
}

const UserProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = useState<User>(null);
    const {token} = useAuth()

    const request = async () => {
        console.log(token)
        if(!token)
        {
            return;
        }
        const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {headers: {"Authorization": token}})
        .then((response) => {
            console.log(response);
            setUser(response.data);})
        .catch(error =>{
            console.log(error);
        })
        
    }
    useEffect(() => {
        request()
    }, [token])
    return(
        <UserContext.Provider value={{user}} >{children}</UserContext.Provider>
    )
}

export default UserProvider