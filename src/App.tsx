import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="container">
        <SideBar setSelectedGenreId={setSelectedGenreId} selectedGenreId={selectedGenreId} setSelectedGenre={setSelectedGenre}></SideBar>
        <Content selectedGenreId={selectedGenreId} genreData={selectedGenre}></Content>
      </div>
    </div>
  )
}