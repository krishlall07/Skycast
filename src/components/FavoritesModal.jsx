import { X, Plus, MapPin, Trash2 } from 'lucide-react';
import { useState } from 'react';

const FavoritesModal = ({ isOpen, onClose, savedCities, setSavedCities, onSearch }) => {
  const [newCity, setNewCity] = useState('');

  // If the modal isn't supposed to be open, render nothing!
  if (!isOpen) return null;

  // Add a city to the list
  const handleAdd = (e) => {
    e.preventDefault();
    if (newCity.trim() !== '' && !savedCities.includes(newCity.trim())) {
      setSavedCities([...savedCities, newCity.trim()]);
      setNewCity(''); // Clear the input
    }
  };

  // Remove a city from the list
  const handleRemove = (cityToRemove) => {
    setSavedCities(savedCities.filter(city => city !== cityToRemove));
  };

  // When a user clicks a city, search it and close the modal
  const handleCityClick = (city) => {
    onSearch(city);
    onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation prevents clicks inside the box from closing the modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Manage Locations</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="add-city-form" onSubmit={handleAdd}>
          <input 
            type="text" 
            placeholder="Add a new city..." 
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button type="submit" className="add-btn">
            <Plus size={20} />
          </button>
        </form>

        <div className="modal-cities-list">
          {savedCities.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.5, marginTop: '20px' }}>No saved locations yet.</p>
          ) : (
            savedCities.map((city, index) => (
              <div key={index} className="modal-city-row">
                <div className="modal-city-name" onClick={() => handleCityClick(city)}>
                  <MapPin size={18} style={{ marginRight: '10px', opacity: 0.7 }} />
                  {city}
                </div>
                <button className="delete-btn" onClick={() => handleRemove(city)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default FavoritesModal;