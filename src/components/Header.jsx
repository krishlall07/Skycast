import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchCitySuggestions } from '../api';
// Assuming you use lucide-react for icons. Adjust if you use something else!
import { Search, MapPin, Bookmark, Settings, Sun, Moon, Crosshair } from 'lucide-react';

const Header = ({ isDarkMode, toggleTheme, city, onSearch, onOpenModal, onOpenSettings, onLocate }) => {
  // --- NEW STATE FOR AUTOCOMPLETE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 1. The Debounce Hook: Waits 300ms after the user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 2. The API Effect: Runs ONLY when the debounced word changes
  useEffect(() => {
    // Only search if they typed at least 3 letters
    if (debouncedSearchTerm.length >= 3) {
      const getSuggestions = async () => {
        const results = await fetchCitySuggestions(debouncedSearchTerm);
        setSuggestions(results);
        setIsDropdownOpen(true);
      };
      getSuggestions();
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [debouncedSearchTerm]);

  // 3. Handle City Selection
  const handleSelectCity = (selectedCityObj) => {
    // Format the query for the main WeatherAPI call (e.g., "London, United Kingdom")
    const searchQuery = `${selectedCityObj.name}, ${selectedCityObj.country}`;
    
    onSearch(searchQuery); // Tell App.jsx to fetch the weather
    setSearchTerm('');     // Clear the input box
    setIsDropdownOpen(false); // Close the menu
  };

  return (
    <header className="header-container">
      {/* Left Side: Current Location Display */}
      <div className="location-display">
        <MapPin className="icon-secondary" size={24} />
        <span className="location-text">{city}</span>
      </div>

      {/* Middle: The Search Bar & Dropdown Menu */}
      {/* We add position: 'relative' here so the dropdown floats perfectly below it */}
      <div className="search-container" style={{ position: 'relative' }}>
        <Search className="icon-secondary" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for cities..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* --- THE AUTOCOMPLETE DROPDOWN UI --- */}
        {isDropdownOpen && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item) => (
              <li 
                key={item.id} 
                className="suggestion-item"
                onClick={() => handleSelectCity(item)}
              >
                <span className="sugg-name">{item.name}</span>
                <span className="sugg-region">
                  {item.region ? `${item.region}, ` : ''}{item.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side: Controls */}
      <div className="header-controls">
        <button onClick={onLocate} title="Current Location">
          <Crosshair size={20} />
        </button>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={onOpenModal} title="Saved Locations">
          <Bookmark size={20} />
        </button>
        <button onClick={onOpenSettings} title="Settings">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;