import { useState } from 'react'; 
import { MapPin, Search, Moon, Sun, Bookmark, Settings, LocateFixed } from 'lucide-react';

// 1. Added 'onOpenModal' to the props we accept
const Header = ({ isDarkMode, toggleTheme, city, onSearch, onOpenModal, onOpenSettings, onLocate }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (searchInput.trim() !== '') {
      onSearch(searchInput); 
      setSearchInput(''); 
    }
  };

  return (
    <header className="header-container">
      
      <div className="location-display">
        <MapPin size={20} className="icon-secondary" />
        <span className="location-text">{city}</span>
      </div>

      <form className="search-container" onSubmit={handleSubmit}>
        <Search size={20} className="icon-secondary" />
        <input 
          type="text" 
          placeholder="Search City..." 
          className="search-input"
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
      </form>

      <div className="header-controls">
        
        {/* NEW BUTTON: The GPS Target Icon */}
        <button className="icon-btn" aria-label="Use Current Location" onClick={onLocate} title="Locate Me">
          <LocateFixed size={20} />
        </button>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {/* 2. Added onClick={onOpenModal} right here! */}
        <button className="icon-btn" aria-label="Saved Locations" onClick={onOpenModal}>
          <Bookmark size={20} />
        </button>
        
        <button className="icon-btn" aria-label="Settings" onClick={onOpenSettings}>
          <Settings size={20} />
        </button>
      </div>

    </header>
  );
};

export default Header;