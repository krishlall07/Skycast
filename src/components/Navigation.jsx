// We removed useState from here, and receive the state as props from App.jsx instead
const Navigation = ({ activeTab, setActiveTab, activeMode, setActiveMode }) => {
  return (
    <nav className="dashboard-nav">
      
      <ul className="timeframe-tabs">
        {['Today', 'Tomorrow', 'Next 7 Days'].map((tab) => (
          <li 
            key={tab} 
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      
      <div className="mode-toggle">
        <button 
          className={`mode-btn ${activeMode === 'Forecast' ? 'active' : ''}`}
          onClick={() => setActiveMode('Forecast')}
        >
          Forecast
        </button>
        <button 
          className={`mode-btn ${activeMode === 'Air Quality' ? 'active' : ''}`}
          onClick={() => setActiveMode('Air Quality')}
        >
          Air Quality
        </button>
      </div>

    </nav>
  );
};

export default Navigation;