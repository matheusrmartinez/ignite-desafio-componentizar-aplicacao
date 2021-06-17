import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

interface ContentProps {
  selectedGenreId: number;
  genreData: GenreResponseProps;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieData {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


export function Content({selectedGenreId, genreData}: ContentProps) {
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    api.get<MovieData[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
  <>
    <header>
    <span className="category">Categoria:<span> {genreData.title}</span></span>
    </header>
  <main>
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
      ))}
    </div>
  </main>
 </>
  )
}