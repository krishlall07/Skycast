import { X, Wind, Waves, CloudRain, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const MapModal = ({ isOpen, onClose, cityCoords }) => {
  const [overlay, setOverlay] = useState('wind'); // Default to wind

  if (!isOpen) return null;
// 1. Split the coordinates (e.g., "23.25,77.41") into separate lat and lon variables
  const [lat, lon] = cityCoords.split(',');

  // 2. Use the official Windy Embed URL format
  const mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=5&overlay=${overlay}`;
  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="map-header">
          <div className="map-title-group">
            <h2>Global Conditions</h2>
            <p>Analyzing Wind & Ocean Swells</p>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {/* Layer Switcher */}
        <div className="map-controls">
          <button 
            className={`control-btn ${overlay === 'wind' ? 'active' : ''}`}
            onClick={() => setOverlay('wind')}
          >
            <Wind size={18} /> Wind
          </button>
          <button 
            className={`control-btn ${overlay === 'waves' ? 'active' : ''}`}
            onClick={() => setOverlay('waves')}
          >
            <Waves size={18} /> Ocean Waves
          </button>
          <button 
            className={`control-btn ${overlay === 'rain' ? 'active' : ''}`}
            onClick={() => setOverlay('rain')}
          >
            <CloudRain size={18} /> Precipitation
          </button>
        </div>

        <div className="iframe-container">
          <iframe 
            title="Weather Map"
            src={mapUrl}
            frameBorder="0"
            style={{ width: '100%', height: '100%', borderRadius: '15px' }}
          ></iframe>
        </div>

        <div className="map-footer">
          <div className="pro-tip-box">
            <Lightbulb size={24} className="tip-icon" />
            <p><strong>Pro Tip:</strong> High onshore winds combined with high wave height significantly increase coastal flood risks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;