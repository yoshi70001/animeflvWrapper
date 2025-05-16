import React, { useState, useEffect } from 'react';
import { searchAnimes } from '../api';
import { Anime } from '../types';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import NoResults from '../components/NoResults';

const HomePage: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Function to handle search
  const handleSearch = async (searchTerm: string) => {
    // If search term is empty, reset to initial state
    if (!searchTerm) {
      setAnimes([]);
      setSearchPerformed(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const results = await searchAnimes(searchTerm);
      setAnimes(results);
    } catch (err) {
      setError('Hubo un error al buscar. Inténtalo de nuevo más tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial anime list
  useEffect(() => {
    const fetchInitialAnimes = async () => {
      try {
        // You might want to fetch initial animes here if your backend supports it
        // For now, we'll just show the search prompt
      } catch (err) {
        console.error('Error fetching initial animes:', err);
      }
    };

    fetchInitialAnimes();
  }, []);

  // Update document title
  useEffect(() => {
    document.title = 'Buscador de Animes';
  }, []);

  return (
    <div className="container-custom py-8">
      <h1>Buscador de Animes</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {isLoading && <LoadingIndicator message="Buscando..." />}
        
        {!isLoading && error && <ErrorMessage message={error} />}
        
        {!isLoading && !error && searchPerformed && animes.length === 0 && (
          <NoResults message="No se encontraron animes que coincidan." />
        )}
        
        {!isLoading && !error && !searchPerformed && animes.length === 0 && (
          <NoResults message="Empieza escribiendo en la barra de búsqueda." />
        )}
        
        {!isLoading && !error && animes.length > 0 && (
          <>
            {animes.map((anime) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;