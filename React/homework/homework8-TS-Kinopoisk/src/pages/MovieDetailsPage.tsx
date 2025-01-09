import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import styles from '../css/MovieDetails.module.css'
import { Movie } from '../types/Movie';
import { QueryContext } from '../context/queryContext';
import { MovieCast } from '../components/MovieCast';

export type MovieDetails = {
  id: number,
  title: string,
  medium_cover_image: string,
  description_full: string,
  genres: string[],
  runtime: string,
  cast: {
    name: string;
    character_name: string;
    url_small_image: string;
  }[],
  medium_screenshot_image1: string,
  medium_screenshot_image2: string,
  medium_screenshot_image3: string,
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const context = useContext(QueryContext);

  const {movie, getMovieById} = context

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId);
    }
  }, [movieId]);

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>Back</button>
      {movie ? (
        <div className={styles.movieDetails}>
          <div className={styles.movieHeader}>
            <h1>{movie.title}</h1>
            <img src={movie.medium_cover_image} alt={movie.title} className={styles.movieImage} />
          </div>
          <p className={styles.movieDescription}>{movie.description_full}</p>
          <p className={styles.movieGenres}><strong>Genres:</strong> {movie.genres.join(", ")}</p>
          <p className={styles.movieRuntime}><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <div className={styles.screenshotSection}>
            <h3>Screenshots:</h3>
              <img src={movie.medium_screenshot_image1} className={styles.screenshotImage} />
              <img src={movie.medium_screenshot_image2} className={styles.screenshotImage} />
              <img src={movie.medium_screenshot_image3} className={styles.screenshotImage} />
          </div>
          <Outlet />{<MovieCast/>}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
      
    </div>
  )
}

export default MovieDetailsPage
