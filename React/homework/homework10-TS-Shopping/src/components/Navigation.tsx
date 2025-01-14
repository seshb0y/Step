import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import ShowCaseList from './ShowCaseList'
import BasketList from './BasketList'

const Navigation = () => {
  return (
    <>
        <nav>
            <ul>
                <NavLink to={'/'}>
                    Show case
                </NavLink>
                <NavLink to={'/basket'}>
                    Basket
                </NavLink>
            </ul>
        </nav>
        <Routes>
            <Route path='/' element={<ShowCaseList/>}/>
            <Route path='/basket' element={<BasketList/>}/>
        </Routes>
    </>
  )
}

export default Navigation