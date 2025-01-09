import { createContext, ReactNode,useState } from 'react'
import { Movie } from '../types/Movie';
import axios from 'axios';
import { MovieDetails } from '../pages/MovieDetailsPage';

interface QueryContextType {
    movie: MovieDetails | null;
    movieSearch: Movie[] | null;
    trendingMovies: Movie[];
    movieSearchName: string | null;
    getMovies: () => void;
    getMovieById: (moveId:number) => void;
    getMovieByName: () => void;
    setMovieSearchName: (string:string) => void;
  }

  
// eslint-disable-next-line react-refresh/only-export-components
export const QueryContext = createContext<QueryContextType | undefined>(undefined);

interface QueryProviderProps {
    children: ReactNode;
  }

export const QueryProvider = ({ children }: QueryProviderProps) => {

    const [movieSearch, setSearchMovie] = useState<Movie[] | null>(null)

    const [movieSearchName, setMovieSearchName] = useState<string | null>(null)

    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

    const [movie, setMovie] = useState<MovieDetails | null>(null);

    const options = {
        method: 'GET',
        url: 'https://yts.mx/api/v2/list_movies.json?limit=50&sort_by=rating',
      };
    
    const getMovies = async () => {
    try{
        const response = await axios.request(options)
        console.log(response.data.data.movies)
        setTrendingMovies(response.data.data.movies)
    }catch(error){
        console.log(error)
    }
    }

    const getMovieById = async (moveId: number) => {
      try {
        const response = await axios.get(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${moveId}&with_images=true&with_cast=true`
        );
        console.log(response.data.data.movie)
        setMovie(response.data.data.movie);
      } catch (error) {
        console.log(error);
      }
    }

    const getMovieByName = async () => {
        try{
            const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${movieSearchName}`)
            console.log(response.data)
            setSearchMovie(response.data.data.movies)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <QueryContext.Provider value={{movie,getMovieByName, getMovies, trendingMovies, setMovieSearchName, getMovieById, movieSearch, movieSearchName}}>
        {children}
    </QueryContext.Provider >
  )
}