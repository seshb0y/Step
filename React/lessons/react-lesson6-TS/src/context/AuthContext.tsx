import axios from "axios";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
    token: string | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string, repeatPassword: string) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("Context should be within Provider")
    }
    return context
}


interface Props {
    children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({children}) => {
    const [token, setToken] = useState<string>("");
    const signIn = async (email: string, password: string) => {

        const response = await axios.post(
            "https://api.escuelajs.co/api/v1/auth/login",
            {
                email, password
            }
        )
        setToken(`Bearer ${response.data.access_token}`)
        console.log(response.data)
    };
    const signOut = async () => {};
    const signUp = async () => {};

    return(
        <AuthContext.Provider value={{token, signIn, signOut, signUp}} >{children}</AuthContext.Provider>
    )
}

export default AuthProvider