import { SunDim, Droplets, Eye } from 'lucide-react';

const TodaysOverview = ({ data, isLoading, preferences, onOpenMap }) => {
  if (isLoading || !data) return <div className="overview-section">Loading...</div>;

  const current = data.current;
  
  // Helpers to make the code cleaner below
  const isMetricSpeed = preferences.speedUnit === 'kph';
  const isCelsius = preferences.tempUnit === 'celsius';

  return (
    <div className="overview-section">
      <h3 className="section-title">Today's Overview</h3>
      
      <div className="overview-grid">
        
        {/* Wind Status */}
        <div className="overview-card">
          <p className="card-label">Wind Status</p>
          <div className="wind-chart-placeholder">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bar" style={{ height: `${Math.random() * 40 + 10}px` }}></div>
            ))}
          </div>
          <div className="card-value-row">
            {/* Toggle kph/mph values and text */}
            <h4>{isMetricSpeed ? current.wind_kph : current.wind_mph} <span className="unit">{isMetricSpeed ? 'km/h' : 'mph'}</span></h4>
            <span className="time-small">{current.wind_dir}</span>
          </div>
        </div>

        {/* UV Index (Stays the same) */}
        <div className="overview-card">
          <p className="card-label">UV Index</p>
          <div className="uv-gauge-container"><SunDim size={50} color="#bbd8ec" /></div>
          <div className="card-value-row flex-center">
            <h4>{current.uv} <span className="unit">UV</span></h4>
          </div>
        </div>

        {/* Humidity */}
        <div className="overview-card">
          <p className="card-label">Humidity</p>
          <div className="card-icon-center"><Droplets size={40} color="#bbd8ec" /></div>
          <div className="card-value-row">
            <h4>{current.humidity}<span className="unit">%</span></h4>
            {/* Toggle Feels Like temp */}
            <p className="card-desc">Feels like {isCelsius ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f)}°</p>
          </div>
        </div>

        {/* Visibility */}
        <div className="overview-card">
          <p className="card-label">Visibility</p>
          <div className="card-icon-center"><Eye size={40} color="#bbd8ec" /></div>
          <div className="card-value-row">
            {/* Toggle km/miles based on wind speed preference! */}
            <h4>{isMetricSpeed ? current.vis_km : current.vis_miles} <span className="unit">{isMetricSpeed ? 'km' : 'miles'}</span></h4>
            <p className="card-desc">Current visibility distance</p>
          </div>
        </div>

        {/* Promo Card */}
        {/* Change this line: */}
<div className={`promo-card 'promo-light'}`}>
          <h3>Explore global map of wind weather and ocean condition</h3>
          
<button className="promo-btn" onClick={onOpenMap}>
  GET STARTED
</button>
        </div>

      </div>
    </div>
  );
};

export default TodaysOverview;