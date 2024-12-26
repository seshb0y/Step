import React from 'react'
import { Notifications } from './Notifications';
import { Settings } from './Settings';
import { Userinfo } from './Userinfo';
import { User } from '../types';
import { useUser } from '../context/UserContext';


const Dashboard = () => {

  // const context = useUser()
  return (
    <div>
        <Notifications/>
        <Settings/>
        <Userinfo />
    </div>
  )
}

export default Dashboard