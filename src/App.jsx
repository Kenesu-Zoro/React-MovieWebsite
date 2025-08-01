import React, { useState, useEffect, use } from 'react'
import './index.css';
import './App.css';
import Search from './components/Search.jsx';
import Loader from './components/Loader.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './appwrite.js';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(" ");
  //use DebounceHook used for search and api optimisation
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 750 , [searchTerm])

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}` :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint, API_OPTIONS);

      //  console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error!, Failed to fetch Movies. status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);

      if (data.response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch data from TMDB API");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
      
      // console.log("Movies fetched successfully:", data.results[1].original_title);

    } catch (error) {
      console.error("Error fetching data from TMDB API:", error);
      setErrorMessage("Failed to fetch data from TMDB API");
    } finally {
      setLoading(false);
    }
  }

  const fetchTrendingMovies = async () => {
    try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, [])
  
  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />

          <h1>Searching <span className='text-gradient'>Movies</span> Has Never Been <span className='reverse-text-gradient'>Easier</span> !</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
             {trendingMovies.map((movie,index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.searchTerm} />
              </li>
             ))}
            </ul>
          </section>
        )}


        {/* <h1 className='text-amber-50'>{searchTerm}</h1> */}
        <section className='all-movies'>
          <h2 className='text-amber-50 text-2xl font-bold flex p-4'>All Movies :</h2>
        {loading ? (
          <Loader />
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {
              movies.map((movie) => (
               <MovieCard key={movie.id} movie={movie} />
              ))
            }
          </ul>
        )}
        </section>
        
      </div>
    </main>
  )
}

export default App