import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie]= useState<Movie | null>(null)

  const handleSearch = (newQuery: string) => {
    setMovies([])
    setQuery(newQuery);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleClose = () => {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast.error('No movies found for your request.');
        }

        setMovies(data)
      } catch (error) {
        console.log(error);
        
        setError(true);
      } finally {
        setLoading(false);
        }
    }

    getMovies();
  }, [query])

  return (
    <>
    <Toaster/>
    <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}

      {error && !loading && <ErrorMessage/>}
      
      {movies.length > 0 && (
    <MovieGrid movies={movies} onSelect={handleSelect}/>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose}/>
      )}
      </>
  )
};