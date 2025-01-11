import { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types/User';
import axios from 'axios';
import { Post } from '../types/Post';
// import { useParams } from 'react-router-dom';

interface IUserContext{
    getUsersList: () => void;
    getUsersPosts: () => void;
    users: User[] | undefined;
    posts: Post[] | undefined;
    isLoading: boolean;
    selectedUser: User | undefined;
    selectedPost: Post | undefined;
    getUserInfo: (userId:number) => void;
    filteredUsers: string;
    setFilteredUsers: (name: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext | undefined>(undefined)

interface IUserProviderProps{
    children: ReactNode;
}

const UserProvider = ({children}: IUserProviderProps) => {
    const [users, setUsers] = useState<User[] | undefined>()
    const [posts, setPosts] = useState<Post[] | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | undefined>()
    const [selectedPost, setSelectedPost] = useState<Post | undefined>()
    const [filteredUsers, setFilteredUsers] = useState("");

    const getUserInfo = (userId: number) => {
        setSelectedUser(users?.find(user => user.id === Number(userId)));
        setSelectedPost(posts?.find(post => post.userId === Number(userId)))
        console.log(selectedPost)
    }

    const getUsersList = async () => {
        try{
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            console.log(response.data)
            setUsers(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const getUsersPosts = async() => {
        try{
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            
            setPosts(response.data)
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        setIsLoading(false)
        getUsersList();
        getUsersPosts();
        setIsLoading(true)
    }, [])


    return (
        <UserContext.Provider value={{getUsersList, getUsersPosts, posts, users, isLoading, getUserInfo, selectedUser, selectedPost, filteredUsers, setFilteredUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider