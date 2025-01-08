import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import MoviesPage from '../pages/MoviesPage'
import NotFoundPage from '../pages/NotFoundPage'

const Navigation = () => {
  return (
    <div>
        <nav>
            <ul>
                <NavLink className={"menu-item"} to={"/"}>
                    Home
                </NavLink>
                <NavLink className={"menu-item"} to={"/movies"}>
                    Search
                </NavLink>
            </ul>
        </nav>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/movies/*' element={<MoviesPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    </div>

  )
}

export default Navigation