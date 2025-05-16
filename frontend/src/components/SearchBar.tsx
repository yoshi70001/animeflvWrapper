import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Create a debounced version of the search handler
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 3) {
        onSearch(term);
      }
    }, 500),
    [onSearch]
  );

  // Run the debounced search when the search term changes
  useEffect(() => {
    if (searchTerm.length >= 3) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear results if the search term is empty
    if (value.length === 0) {
      onSearch('');
    }
  };

  return (
    <input
      type="text"
      id="searchInput"
      className="form-input"
      placeholder="Escribe el nombre de un anime (mín. 3 letras)..."
      aria-label="Buscar animes"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;