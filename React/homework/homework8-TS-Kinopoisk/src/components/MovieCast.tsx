import { useContext } from 'react'
import { QueryContext } from '../context/queryContext'
import styles from '../css/MovieDetails.module.css'

export const MovieCast = () => {

  const context = useContext(QueryContext);

  if(!context){
    throw new Error('QueryContext is required')
  }
  const {movie} = context;

  return (
    <div className={styles.movieCast}>
    <h3>Cast:</h3>
      {movie && movie.cast && movie.cast.length > 0 ? (
        <ul>
          {movie.cast.map((actor, index) => (
            <li key={index} className={styles.actorItem}>
              <img src={actor.url_small_image} alt={actor.name} className={styles.actorImage} />
              <p>{actor.name} as {actor.character_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
  </div>
  )
}
export default MovieCast;