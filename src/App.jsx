import React from 'react'
import './index.css';
import './App.css';
import Search from './components/search';


const App = () => {
  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
      
          <h1>Searching <span className='text-gradient'>Movies</span> Has Never Been <span className='reverse-text-gradient'>Easier</span> !</h1>
        </header>

        <Search />

      </div>
    </main>
  )
}

export default App