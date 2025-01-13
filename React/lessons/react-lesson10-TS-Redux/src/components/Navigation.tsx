// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TaskList from './TaskList'

const Navigation = () => {

    <Routes>
        <Route path='/' element={<TaskList/>} />
    </Routes>
}

export default Navigation