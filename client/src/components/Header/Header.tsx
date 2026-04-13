import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/images/logo.svg';
import iconUnits from '../../assets/images/icon-units.svg';
import iconDropdown from '../../assets/images/icon-dropdown.svg';

interface UnitOption {
  id: string;
  label: string;
  category: 'temperature' | 'wind' | 'precipitation';
  value: 'metric' | 'imperial';
}

interface HeaderProps {
  tempUnit: 'celsius' | 'fahrenheit';
  windUnit: 'kmh' | 'mph';
  precipUnit: 'mm' | 'inch';
  onTempChange: (val: 'celsius' | 'fahrenheit') => void;
  onWindChange: (val: 'kmh' | 'mph') => void;
  onPrecipChange: (val: 'mm' | 'inch') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  tempUnit, windUnit, precipUnit, 
  onTempChange, onWindChange, onPrecipChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="logo">
        <img src={logo} alt="Weather Now Logo" />
      </div>
      <div className="units-selector">
        <button className={`units-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <img src={iconUnits} alt="" />
          <span>Units</span>
          <img src={iconDropdown} alt="" className={`chevron ${isOpen ? 'rotated' : ''}`} />
        </button>

        {isOpen && (
          <div className="units-dropdown">
            <button 
              className="switch-all-btn" 
              onClick={() => { 
                const isMetric = tempUnit === 'celsius';
                onTempChange(isMetric ? 'fahrenheit' : 'celsius');
                onWindChange(isMetric ? 'mph' : 'kmh');
                onPrecipChange(isMetric ? 'inch' : 'mm');
                setIsOpen(false); 
              }}
            >
              Switch to {tempUnit === 'celsius' ? 'Imperial' : 'Metric'}
            </button>
            
            <div className="dropdown-section">
              <h4>Temperature</h4>
              <div 
                className={`option ${tempUnit === 'celsius' ? 'selected' : ''}`} 
                onClick={() => { onTempChange('celsius'); setIsOpen(false); }}
              >
                Celsius (°C)
              </div>
              <div 
                className={`option ${tempUnit === 'fahrenheit' ? 'selected' : ''}`} 
                onClick={() => { onTempChange('fahrenheit'); setIsOpen(false); }}
              >
                Fahrenheit (°F)
              </div>
            </div>

            <div className="dropdown-section">
              <h4>Wind Speed</h4>
              <div 
                className={`option ${windUnit === 'kmh' ? 'selected' : ''}`}
                onClick={() => { onWindChange('kmh'); setIsOpen(false); }}
              >
                km/h
              </div>
              <div 
                className={`option ${windUnit === 'mph' ? 'selected' : ''}`}
                onClick={() => { onWindChange('mph'); setIsOpen(false); }}
              >
                mph
              </div>
            </div>

            <div className="dropdown-section">
              <h4>Precipitation</h4>
              <div 
                className={`option ${precipUnit === 'mm' ? 'selected' : ''}`}
                onClick={() => { onPrecipChange('mm'); setIsOpen(false); }}
              >
                Millimeters (mm)
              </div>
              <div 
                className={`option ${precipUnit === 'inch' ? 'selected' : ''}`}
                onClick={() => { onPrecipChange('inch'); setIsOpen(false); }}
              >
                Inches (in)
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
