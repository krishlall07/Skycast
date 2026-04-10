const CurrentWeather = ({ data, isLoading, preferences }) => {
  if (isLoading || !data) {
    return (
      <div className="current-weather-card" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h2>Fetching Live Weather...</h2>
      </div>
    );
  }

  const { current, location, forecast } = data;
  const todayAstro = forecast.forecastday[0].astro;

  // --- TIME FORMATTING LOGIC ---
  const localTime = new Date(location.localtime);
  const dayName = localTime.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Listen to the preference for 12h vs 24h clock!
  const timeString = localTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: preferences.timeFormat === '12h' 
  });

  // Helper function to convert API's "05:29 AM" into 24h format if needed
  const formatAstroTime = (timeStr) => {
    if (preferences.timeFormat === '12h') return timeStr;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours}:${minutes}`;
  };

  return (
    <div className="current-weather-card">
      
      <div className="card-header">
        <h2>{dayName}</h2>
        <span className="time">{timeString}</span>
      </div>

      <div className="main-temp-container">
        {/* Listen to the preference for Celsius vs Fahrenheit! */}
        <h1 className="huge-temp">
          {preferences.tempUnit === 'celsius' ? Math.round(current.temp_c) : Math.round(current.temp_f)}°
        </h1>
        
        <div className="weather-icon-large">
          <img 
            src={`https:${current.condition.icon}`} 
            alt={current.condition.text} 
            style={{ width: '80px', height: '80px' }}
          />
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="details-col">
          {/* Real Feel toggle */}
          <p>Real Feel <strong>
            {preferences.tempUnit === 'celsius' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f)}°
          </strong></p>
          
          {/* Wind Speed toggle */}
          <p>Wind {current.wind_dir} <strong>
            {preferences.speedUnit === 'kph' ? current.wind_kph : current.wind_mph} 
            <span style={{fontSize: '0.7rem', marginLeft: '2px'}}>
              {preferences.speedUnit === 'kph' ? 'km/h' : 'mph'}
            </span>
          </strong></p>
          
          <p>Pressure <strong>{current.pressure_mb} MB</strong></p>
          <p>Humidity <strong>{current.humidity}%</strong></p>
        </div>

        <div className="details-col align-right">
          <p className="flex-center">Sunrise <strong>{formatAstroTime(todayAstro.sunrise)}</strong></p>
          <p className="flex-center">Sunset <strong>{formatAstroTime(todayAstro.sunset)}</strong></p>
        </div>
      </div>

    </div>
  );
};

export default CurrentWeather;