import { MapPin } from 'lucide-react';

// 1. Added onOpenModal and savedCities to our props
const Sidebar = ({ data, isLoading, onSearch, onOpenModal, savedCities, preferences }) => {
  if (isLoading || !data) return <div className="sidebar-container"></div>;

  // --- GETTING LIVE HOURLY RAIN DATA ---
  const currentHourString = data.location.localtime;
  const currentHour = new Date(currentHourString).getHours();
  const todaysHours = data.forecast.forecastday[0].hour;
  const nextSixHours = todaysHours.slice(currentHour, currentHour + 6);

  // We only want to show a maximum of 4 cities in the sidebar preview
  const previewCities = savedCities.slice(0, 4);

  return (
    <div className="sidebar-container">
      
      {/* --- Chance of Rain Section (Unchanged) --- */}
      <div className="sidebar-section">
        <h3 className="section-title">Chance Of Rain</h3>
        
        <div className="rain-chart-container">
          <div className="chart-y-axis">
            <span>Heavy</span>
            <span>Rainy</span>
            <span>Sunny</span>
          </div>

          <div className="chart-columns">
            {nextSixHours.map((hourData, index) => {
              // Now it listens to the timeFormat preference!
              const time = new Date(hourData.time).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                hour12: preferences.timeFormat === '12h' 
              });
              
              const rainChance = hourData.chance_of_rain;
              // ... rest stays the same

              return (
                <div key={index} className="chart-col">
                  <div className="chart-bar-area">
                    <div className="chart-dot" style={{ bottom: `${rainChance}%` }}></div>
                    <div className="chart-line" style={{ height: `${rainChance}%` }}></div>
                  </div>
                  <span className="chart-time">{time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Saved Cities Section --- */}
      <div className="sidebar-section">
        <div className="section-header-row">
          <h3 className="section-title">Saved Cities</h3>
          
          {/* 2. THE MAGIC BUTTON: Click this to open the modal! */}
          <span 
            className="see-all" 
            onClick={onOpenModal} 
            style={{ cursor: 'pointer' }}
          >
            See All
          </span>
          
        </div>
        
        <div className="cities-list">
          {/* 3. Render our actual saved cities from the App.jsx state */}
          {previewCities.length === 0 ? (
            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>No saved cities. Click 'See All' to add some!</p>
          ) : (
            previewCities.map((city, index) => (
              <div 
                key={index} 
                className="city-card"
                onClick={() => onSearch(city)}
              >
                <div className="city-info">
                  <span className="country-label">Saved Location</span>
                  <h4 className="city-name">{city}</h4>
                  <span className="city-condition">Click to view weather</span>
                </div>
                <div className="city-icon">
                  <MapPin size={24} color="#3b82f6" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;