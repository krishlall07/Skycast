// Passed preferences into the props!
const WeeklyForecast = ({ data, isLoading, activeTab, preferences }) => {
  if (isLoading || !data) return <div className="weekly-forecast-container"></div>;

  let displayCards = [];

  // Helper function to format the time based on user settings
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      hour12: preferences.timeFormat === '12h' 
    });
  };

  if (activeTab === 'Today') {
    const currentHour = new Date(data.location.localtime).getHours();
    const allHours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
    const nextSixHours = allHours.slice(currentHour + 1, currentHour + 7);
    
    displayCards = nextSixHours.map((hour) => ({
      title: formatTime(hour.time), // Uses our new helper!
      icon: hour.condition.icon,
      text: hour.condition.text,
      // Toggles Celsius/Fahrenheit!
      temp: preferences.tempUnit === 'celsius' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)
    }));
  } 
  else if (activeTab === 'Tomorrow') {
    const tomorrowsHours = data.forecast.forecastday[1].hour;
    const targetIndexes = [6, 9, 12, 15, 18, 21];
    
    displayCards = targetIndexes.map((index) => {
      const hour = tomorrowsHours[index];
      return {
        title: formatTime(hour.time),
        icon: hour.condition.icon,
        text: hour.condition.text,
        temp: preferences.tempUnit === 'celsius' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)
      };
    });
  } 
  else {
    const forecastDays = data.forecast.forecastday.slice(1, 7);
    displayCards = forecastDays.map((dayData) => ({
      title: new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      icon: dayData.day.condition.icon,
      text: dayData.day.condition.text,
      // WeatherAPI puts max temps on the 'day' object
      temp: preferences.tempUnit === 'celsius' ? Math.round(dayData.day.maxtemp_c) : Math.round(dayData.day.maxtemp_f)
    }));
  }

  return (
    <div className="weekly-forecast-container">
      {displayCards.map((item, index) => (
        <div key={index} className="forecast-mini-card">
          <span className="forecast-day">{item.title}</span>
          <div className="forecast-icon">
            <img src={`https:${item.icon}`} alt={item.text} style={{ width: '40px', height: '40px' }} />
          </div>
          <span className="forecast-temp">{item.temp}°</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;