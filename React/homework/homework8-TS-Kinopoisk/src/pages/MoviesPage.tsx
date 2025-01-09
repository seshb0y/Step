import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../context/queryContext"
import style from '../css/HomePage.module.css'
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const [inputValue, setInputValue] = useState('');

  const context = useContext(QueryContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if(!context){
    throw new Error('QueryContext is undefined')
  }
  const {movieSearchName, movieSearch, setMovieSearchName, getMovieByName} = context;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setMovieSearchName(inputValue); 
    console.log(inputValue)
    console.log(movieSearchName)
  };

  useEffect(()=>{
    if(movieSearchName){
      getMovieByName();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieSearchName])

  const navigate = useNavigate();

  const handleMoreInfo = (id: number) => {
    navigate(`/movies/${id}`);
  }

  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <input type="text" value={inputValue} onChange={handleInputChange}/>
        <button>Search</button>
      </form>
      <ul className={style.movieList}>
      {movieSearch ? (movieSearch.map((element) => (
          <li key={element.id} className={style.movieElement}>
            <div className={style.movieContainer}>
              <img src={element.medium_cover_image} alt="" />
              <p className={style.movieTitle}>{element.title}</p>
              <button onClick={()=> handleMoreInfo(element.id)}>More info</button>
            </div>
          </li>
        ))) : (
          <p>enter movie name for search</p>
        )}
      </ul>
    </div>
  )
}

export default MoviesPage