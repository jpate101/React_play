import logo from './logo.svg';
import './App.css';
import { useEffect ,useState} from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
//20f9b4ce

const API_URL = 'http://www.omdbapi.com?apikey=20f9b4ce';

const movie1 = {
  "Title": "Prey",
  "Year": "2022",
  "imdbID": "tt11866324",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMDBlMDYxMDktOTUxMS00MjcxLWE2YjQtNjNhMjNmN2Y3ZDA1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg"
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchmovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(() => {
    searchmovies("prey");
    },[])

  return (
    <div className='app'>
      <h1> MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search For Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
          />
          <img src={SearchIcon}
          alt="search"
          onClick={() => searchmovies(searchTerm)}/>
      </div>
      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie = {movie} />
            ))}
          </div>
        ) : ( 
          <div className='empty'>
            <h2>no movies found</h2>
          </div>
        ) 

      }
      
    </div>
  );
}

export default App;
