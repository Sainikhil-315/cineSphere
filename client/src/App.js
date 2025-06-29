import './App.css';
import React,{ useState } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Movies from './Components/Movies';
import MovieItems from './Components/MovieItems';
import PopularMovies from './Components/PopularMovies';
import NowPlaying from './Components/NowPlaying';
import TopRated from './Components/TopRated';
import Genres from './Components/Genres';
import AllGenres from './Components/AllGenres';
import UpcomingMovies from './Components/UpcomingMovies';
import PersonDetails from './Components/PersonDetails';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log("api key: ", apiKey);
  const [searchMovie, setSearchMovie] = useState('');
  const [newMovie, setNewMovie] = useState(null);
  const [genre,setGenre] = useState(0);

  const onMovieUpdate = (newMovie) => {
    setSearchMovie(newMovie)    
  }
  const detailedView = (movie) => {
    setNewMovie(movie);
  }
  const genreById = (genreid) => {
    setGenre(genreid);
  }

  return (
    <Router>
      <Navbar onMovieUpdate={onMovieUpdate}/>
      <Routes>
        <Route exact path='/' element={<AllGenres genreById={genreById} apiKey={apiKey}/>}/>
        <Route exact path='/genre/:genreId' element={<Genres genreId={genre} detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path='/search' element={<Movies searchMovie={searchMovie} detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path='/movie/:id' element={<MovieItems newMovie={newMovie} apiKey={apiKey}/>}/>
        <Route exact path='/movies/popular' element={<PopularMovies detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path='/movies/now-playing' element={<NowPlaying detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path='/movies/top-rated' element={<TopRated detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path='/movies/upcoming' element={<UpcomingMovies detailedView={detailedView} apiKey={apiKey}/>}/>
        <Route exact path="/person/:id" element={<PersonDetails detailedView={detailedView} apiKey={apiKey} />} />
      </Routes>
    </Router>
  );
}

export default App;
