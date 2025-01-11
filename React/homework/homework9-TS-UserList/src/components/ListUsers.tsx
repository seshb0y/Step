import { useContext, useMemo} from 'react'
import { UserContext } from '../context/UserContext'
import { User } from '../types/User';
import styles from '../modules/Components.module.css'
import { useNavigate } from 'react-router-dom';

const UsersList = () => {

    const context = useContext(UserContext)

    if(!context){
        throw new Error('UserContext is required');
    }

    const {users, isLoading, filteredUsers} = context;

    const filteredAndSortedUsers = useMemo(() => {
        return users
        ? users
            .filter((user: User) => user.name.toLowerCase().includes(filteredUsers.toLowerCase()))
        : [];
    }, [users, filteredUsers]) 
        

    const navigate = useNavigate()

    const handleShowMore = (e: number) => {
        navigate(`/${e}`)
    }
    return (
        <div>
            <ul>
                {isLoading ? (filteredAndSortedUsers?.map((element: User) => (
                    <li className={styles.userElement} key={element.id}>{element.name} <br/> "{element.username}" <br />
                    <button onClick={() => handleShowMore(element.id)}>show more</button>
                    </li>
                ))) : (<h1>Loading....</h1>)}
            </ul>
        </div>
      )
}

export default UsersList