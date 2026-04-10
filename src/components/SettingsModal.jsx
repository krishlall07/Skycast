import { X } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, preferences, setPreferences }) => {
  if (!isOpen) return null;

  // Helper function to update just one setting at a time
  const handleToggle = (settingKey, value) => {
    setPreferences((prev) => ({
      ...prev,
      [settingKey]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-list">
          
          {/* Temperature Toggle */}
          <div className="setting-row">
            <span className="setting-label">Temperature Unit</span>
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${preferences.tempUnit === 'celsius' ? 'active' : ''}`}
                onClick={() => handleToggle('tempUnit', 'celsius')}
              >°C</button>
              <button 
                className={`toggle-btn ${preferences.tempUnit === 'fahrenheit' ? 'active' : ''}`}
                onClick={() => handleToggle('tempUnit', 'fahrenheit')}
              >°F</button>
            </div>
          </div>

          {/* Wind Speed Toggle */}
          <div className="setting-row">
            <span className="setting-label">Wind Speed</span>
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${preferences.speedUnit === 'kph' ? 'active' : ''}`}
                onClick={() => handleToggle('speedUnit', 'kph')}
              >km/h</button>
              <button 
                className={`toggle-btn ${preferences.speedUnit === 'mph' ? 'active' : ''}`}
                onClick={() => handleToggle('speedUnit', 'mph')}
              >mph</button>
            </div>
          </div>

          {/* Time Format Toggle */}
          <div className="setting-row">
            <span className="setting-label">Time Format</span>
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${preferences.timeFormat === '12h' ? 'active' : ''}`}
                onClick={() => handleToggle('timeFormat', '12h')}
              >12h</button>
              <button 
                className={`toggle-btn ${preferences.timeFormat === '24h' ? 'active' : ''}`}
                onClick={() => handleToggle('timeFormat', '24h')}
              >24h</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsModal;