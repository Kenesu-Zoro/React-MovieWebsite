import React, { useState, useEffect } from 'react'
import './index.css';
import './App.css';
import Search from './components/search';

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
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?include_adult=true&sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint, API_OPTIONS);

      //  console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error!, Failed to fetch Movies. status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch data from TMDB API");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);

    } catch (error) {
      console.error("Error fetching data from TMDB API:", error);
      setErrorMessage("Failed to fetch data from TMDB API");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />

          <h1>Searching <span className='text-gradient'>Movies</span> Has Never Been <span className='reverse-text-gradient'>Easier</span> !</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* <h1 className='text-amber-50'>{searchTerm}</h1> */}
        <section className='all-movies'>
          <h2 className='text-amber-50 text-2xl font-bold flex p-4'>All Movies :</h2>
        {loading ? (
          <p className='text-white text-2xl'>Loading...</p>
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {
              movies.map((movie) => (
                <p className='text-white font-bold'>{movie.title}</p>
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