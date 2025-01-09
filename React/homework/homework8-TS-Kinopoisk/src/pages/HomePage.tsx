import { useContext, useEffect,} from 'react'
import { QueryContext } from '../context/queryContext';
import style from '../css/HomePage.module.css'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const context = useContext(QueryContext)

  if (!context) {
    throw new Error('QueryContext must be used within a QueryProvider');
  }
  
  const {getMovies, trendingMovies} = context;

  useEffect(() => {
    if (trendingMovies.length === 0) {
      getMovies();
    }
  }, [trendingMovies, getMovies])

  const navigate = useNavigate();

  const handleMoreInfo = (id: number) => {
    navigate(`/movies/${id}`);
  }

  return (
    <div>
      <h1>Trending movies</h1>
      <ul className={style.movieList}>
        {trendingMovies.map((element) => (
          <li key={element.id} className={style.movieElement}>
            <div className={style.movieContainer}>
              <img src={element.medium_cover_image} alt="" />
              <p className={style.movieTitle}>{element.title}</p>
              <button onClick={()=> handleMoreInfo(element.id)}>More info</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default HomePage;