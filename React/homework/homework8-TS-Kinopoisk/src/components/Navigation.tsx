import { lazy, Suspense } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
// import { HomePage } from '../pages/HomePage'
// import MoviesPage from '../pages/MoviesPage'
// import NotFoundPage from '../pages/NotFoundPage'
// import MovieDetailsPage from '../pages/MovieDetailsPage'
import { MovieCast } from './MovieCast'
// import { MovieReviews } from './MovieReviews'


// const HomePage = lazy(() => import(../pages/HomePage));
const HomePage = lazy(() => import('../pages/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
// const MovieCast = lazy(() => import('./MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));

const Navigation = () => {
  return (
    <div>
        <nav>
            <ul>
                <NavLink className={"menu-item"} to={"/"}>
                    Home
                </NavLink>
                <div></div>
                <NavLink className={"menu-item"} to={"/movies"}>
                    Search
                </NavLink>
            </ul>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/movies/:movieId' element={<MovieDetailsPage/>}>
                    <Route path='cast' element={<MovieCast/>}/>
                    <Route path='reviews' element={<MovieReviews/>}/>
                </Route>
                <Route path='/movies/*' element={<MoviesPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </Suspense>
    </div>

  )
}

export default Navigation