import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from '../services/api';

interface GenreResponseData {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface GenreResponseProps {
  setSelectedGenreId(value: number): void;
  selectedGenreId: number;
  setSelectedGenre(value: GenreResponseData) : void;  
}

export function SideBar({setSelectedGenreId, selectedGenreId, setSelectedGenre}: GenreResponseProps) {

  const [genres, setGenres] = useState<GenreResponseData[]>([]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseData[]>('genres').then(response => {
      setGenres(response.data);
    });

    api.get<GenreResponseData>(`genres/${selectedGenreId}`).then(response => {
    setSelectedGenre(response.data);
    }), [selectedGenreId]});

  return (
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>
    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>
  )
  
}