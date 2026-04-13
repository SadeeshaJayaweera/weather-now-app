import React, { useState } from 'react';
import './Search.css';
import searchIcon from '../../assets/images/icon-search.svg';
import axios from 'axios';

interface SearchProps {
  onSearch: (city: string) => void;
  onLocationSelect: (loc: { name: string, lat: number, lon: number }) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch, onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.length > 2) {
      try {
        const res = await axios.get('/api/search', { params: { q: val } });
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (loc: any) => {
    setQuery(`${loc.name}, ${loc.country}`);
    setShowSuggestions(false);
    onLocationSelect({
      name: `${loc.name}, ${loc.country}`,
      lat: loc.latitude,
      lon: loc.longitude
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <section className="search-section">
      <h1>How's the sky looking today?</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <img src={searchIcon} alt="" className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for a place..." 
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-list">
              {suggestions.map((loc, i) => (
                <div key={i} className="suggestion-item" onClick={() => handleSelect(loc)}>
                  {loc.name}, {loc.country}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>
    </section>
  );
};

export default Search;
