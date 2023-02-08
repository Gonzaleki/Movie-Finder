import responseMovies from '../mocks/with-results.json'
// import withoutResults from './mocks/with-results.json'

// este custom Hook se encarga de hacer el fetching de datos
export function useMovies () {
  // const API = 'https://www.omdbapi.com/?apikey=4287ad07&s='
  const movies = responseMovies.Search
  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return { movies: mappedMovies }
}
