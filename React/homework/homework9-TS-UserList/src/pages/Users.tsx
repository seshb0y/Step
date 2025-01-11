import UsersList from '../components/ListUsers';
import UsersFilter from '../components/UsersFilter';

const Users = () => {
  return (
    <div>
      <UsersFilter/>
      <UsersList/>
    </div>
  )
}

export default Users