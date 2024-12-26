import React from 'react'
import { User } from '../types'
import { useUser } from '../context/UserContext'

// interface Props {
//     user: User
// }

export const Userinfo = () => {
    // const [name, age, gender] = user;

    const {user} = useUser()

  return (
    <div>
        <h1>User Info</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.avatar}</h2>
        <h2>{user?.email}</h2>
        <h2>{user?.id}</h2>
        <h2>{user?.role}</h2>
        <h2>{user?.password}</h2>
    </div>
  )
}
