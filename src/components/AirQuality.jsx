import { Wind, Activity, Leaf, ShieldAlert } from 'lucide-react';

const AirQuality = ({ data, isLoading }) => {
  if (isLoading || !data) return <div className="overview-section">Loading...</div>;

  const aqiData = data.current.air_quality;

  // WeatherAPI uses the US EPA Index from 1 (Good) to 6 (Hazardous)
  const getAqiStatus = (index) => {
    switch (index) {
      case 1: return { text: 'Good', color: '#4ade80' }; // Green
      case 2: return { text: 'Moderate', color: '#facc15' }; // Yellow
      case 3: return { text: 'Unhealthy for Sensitive Groups', color: '#fb923c' }; // Orange
      case 4: return { text: 'Unhealthy', color: '#f87171' }; // Red
      case 5: return { text: 'Very Unhealthy', color: '#a855f7' }; // Purple
      case 6: return { text: 'Hazardous', color: '#881337' }; // Dark Red
      default: return { text: 'Unknown', color: '#9ca3af' }; // Grey
    }
  };

  const status = getAqiStatus(aqiData['us-epa-index']);

  return (
    <div className="overview-section">
      <h3 className="section-title">Air Quality Index (AQI)</h3>
      
      <div className="overview-grid">
        
        {/* Card 1: Overall Status */}
        <div className="overview-card" style={{ borderTop: `4px solid ${status.color}` }}>
          <p className="card-label">EPA Standard</p>
          <div className="card-icon-center">
            <Leaf size={40} color={status.color} />
          </div>
          <div className="card-value-row">
            <h4>{status.text}</h4>
          </div>
        </div>

        {/* Card 2: PM2.5 */}
        <div className="overview-card">
          <p className="card-label">PM2.5</p>
          <div className="card-icon-center">
            <Activity size={40} color="#bbd8ec" />
          </div>
          <div className="card-value-row">
            <h4>{Math.round(aqiData.pm2_5)} <span className="unit">µg/m³</span></h4>
            <p className="card-desc">Fine particles</p>
          </div>
        </div>

        {/* Card 3: PM10 */}
        <div className="overview-card">
          <p className="card-label">PM10</p>
          <div className="card-icon-center">
            <Wind size={40} color="#bbd8ec" />
          </div>
          <div className="card-value-row">
            <h4>{Math.round(aqiData.pm10)} <span className="unit">µg/m³</span></h4>
            <p className="card-desc">Coarse particles</p>
          </div>
        </div>

        {/* Card 4: Carbon Monoxide */}
        <div className="overview-card">
          <p className="card-label">Carbon Monoxide</p>
          <div className="card-icon-center">
            <ShieldAlert size={40} color="#bbd8ec" />
          </div>
          <div className="card-value-row">
            <h4>{Math.round(aqiData.co)} <span className="unit">µg/m³</span></h4>
            <p className="card-desc">CO levels</p>
          </div>
        </div>

        {/* Card 5: Promo Card (Reused to keep layout consistent) */}
        <div className="promo-card">
          <h3>Explore global map of wind weather and ocean condition</h3>
          <button className="promo-btn">GET STARTED</button>
        </div>

      </div>
    </div>
  );
};

export default AirQuality;