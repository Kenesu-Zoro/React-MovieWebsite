import React from 'react'

const MovieCard = ({movie : {title, poster_path, release_date, vote_average, original_language}}) => {
  return (
    <div className='movie-card'>
        <img
         src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `/No-Poster.png` } alt={title} 
         />
        <div className='mt-4 text-sm text-white font-bold h-12 overflow-hidden line-clamp-2'>
            {title}
        </div>

        <div className='content'>
            <div>
                <img src='star.svg' alt='Star-Icon'/> 
            </div>
            <span> • </span>
            <div> 
                <span className='text-amber-50 font-bold'>{vote_average.toFixed(1)}</span>
            </div>
            <span> • </span>
            <div>
                <span className='text-amber-50 '>{original_language}</span>
            </div>
            <span> • </span>
            <div>
                <span className='text-amber-50 '>{release_date.slice(0,4)}</span>
            </div>
        </div>
        
    </div>
  )
}

export default MovieCard