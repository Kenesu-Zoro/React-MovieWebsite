import React, { useState, useEffect } from 'react'
import './index.css';
import './App.css';
import Search from './components/search';

const API_BASE_URL = "https://api.themoviedb.org/3" ;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  } 
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
  }, [])
  
  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
      
          <h1>Searching <span className='text-gradient'>Movies</span> Has Never Been <span className='reverse-text-gradient'>Easier</span> !</h1>
        </header>

        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        {/* <h1 className='text-amber-50'>{searchTerm}</h1> */}

      </div>
    </main>
  )
}

export default App