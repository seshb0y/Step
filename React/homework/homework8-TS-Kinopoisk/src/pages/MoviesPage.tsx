import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MovieCast } from '../components/MovieCast'
import { MovieReviews } from '../components/MovieReviews'
import MovieDetailsPage from './MovieDetailsPage'

const MoviesPage = () => {
  return (
    <Routes>
      <Route path='/movies/:movieId' element={<MovieDetailsPage/>}>
        <Route path='cast' element={<MovieCast/>}/>
        <Route path='reviews' element={<MovieReviews/>}/>
      </Route>
    </Routes>
  )
}

export default MoviesPage