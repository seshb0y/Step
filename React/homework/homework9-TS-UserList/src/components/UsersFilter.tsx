import { ChangeEvent, useContext } from 'react'
import { UserContext } from '../context/UserContext'

const UsersFilter = () => {

    const context = useContext(UserContext);
    if(!context){
        throw new Error("UserContext is required");
    }

    const {filteredUsers, setFilteredUsers} = context;

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFilteredUsers(e.target.value);
    }

  return (
    <div>
        <form action="">
            <input type="text" value={filteredUsers} onChange={handleChange}/>
        </form>
    </div>
  )
}

export default UsersFilter