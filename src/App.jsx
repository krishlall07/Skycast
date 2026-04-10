import { useState, useEffect } from 'react';
import AirQuality from './components/AirQuality';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import MapModal from './components/MapModal';
import Navigation from './components/Navigation';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import TodaysOverview from './components/TodaysOverview';
import Sidebar from './components/Sidebar';
// NEW MODAL CODE: 1. Imported the new component
import FavoritesModal from './components/FavoritesModal'; 
import './index.css';

function App() {
  // --- STATE MANAGEMENT ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    return true; 
  });
  const [activeTab, setActiveTab] = useState('Today');
  const [activeMode, setActiveMode] = useState('Forecast');
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // NEW API STATES
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    return savedCity ? savedCity : 'Dhaka';
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW MODAL CODE: 2. Added the state to control the modal and save the cities
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedCities, setSavedCities] = useState(() => {
    const saved = localStorage.getItem('savedCities');
    return saved ? JSON.parse(saved) : ['Beijing', 'California', 'Dubai', 'Charlottetown'];
  });
  // NEW SETTINGS CODE: State to open/close the settings menu
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State to hold the global preferences
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : {
      tempUnit: 'celsius', 
      speedUnit: 'kph',
      timeFormat: '12h'
    };
  });

  // Save to local storage whenever a preference is changed
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }, [savedCities]);
  // --------------------------------------------------------------------------

  // --- THEME EFFECT ---
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode; 
      localStorage.setItem('isDarkMode', newMode); 
      return newMode; 
    });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity); 
    localStorage.setItem('lastSearchedCity', searchedCity); 
  };
// --- GEOLOCATION FUNCTION ---
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoading(true); 
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const newLocation = `${lat},${lon}`;
          
          // THE FIX: Check if we are already viewing these exact coordinates!
          if (city === newLocation) {
            setIsLoading(false); // Manually turn off the loading screen
          } else {
            handleSearch(newLocation); // Otherwise, search normally
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Location access denied or unavailable. Please search manually.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  // --- AUTO-LOCATE ON FIRST VISIT ---
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    // If there is NO saved city, it must be their first time here
    if (!savedCity) {
      getUserLocation();
    }
  }, []); // The empty array [] means this only runs once when the app first loads

  // --- API FETCH EFFECT ---
  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const API_KEY = 'e1abb96ddbc642c9aab212743260804'; 
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`);
        
        if (!response.ok) {
          throw new Error('Location not found'); 
        }

        const data = await response.json();
        setWeatherData(data);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="dashboard-container">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        city={weatherData ? `${weatherData.location.name}, ${weatherData.location.country}` : city} 
        onSearch={handleSearch} 
        onOpenModal={() => setIsModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLocate={getUserLocation} /* <-- Added this new prop! */
      />
      
      <main className="main-layout">
        
        <section className="left-panel">
          <Navigation 
            activeTab={activeTab} setActiveTab={setActiveTab}
            activeMode={activeMode} setActiveMode={setActiveMode}
          />
          
          <div className="hero-row">
            {error ? (
              <div className="current-weather-card" style={{ backgroundColor: '#f87171', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2>Oops! {error}</h2>
                <p style={{ marginTop: '10px' }}>Try searching for a city name instead.</p>
              </div>
            ) : (
              <>
                <CurrentWeather data={weatherData} isLoading={isLoading} preferences={preferences} />
                <WeeklyForecast data={weatherData} isLoading={isLoading} preferences={preferences} activeTab={activeTab} />
              </>
            )}
          </div>
          
          {activeMode === 'Forecast' ? (
            <>
              <TodaysOverview 
  data={weatherData} 
  isLoading={isLoading} 
  preferences={preferences} 
  onOpenMap={() => setIsMapOpen(true)} // <-- Add this prop
/>
            </>
          ) : (
            <>
              <AirQuality data={weatherData} isLoading={isLoading} />
            </>
          )}
        </section>

        <aside className="right-panel">
          {/* NEW MODAL CODE: Passed the open modal function and saved cities to Sidebar */}
          <Sidebar 
            data={weatherData} 
            isLoading={isLoading} 
            preferences={preferences}
            onSearch={handleSearch} 
            onOpenModal={() => setIsModalOpen(true)}
            savedCities={savedCities}
          />
        </aside>
      </main>

      {/* NEW MODAL CODE: 3. Added the modal component below the main layout */}
      <FavoritesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        savedCities={savedCities} 
        setSavedCities={setSavedCities}
        onSearch={handleSearch}
      />
      {/* NEW SETTINGS MODAL */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        setPreferences={setPreferences}
      />

      <MapModal 
  isOpen={isMapOpen} 
  onClose={() => setIsMapOpen(false)} 
  cityCoords={weatherData ? `${weatherData.location.lat},${weatherData.location.lon}` : city}
/>
    </div>
    
    
  );
}


export default App;