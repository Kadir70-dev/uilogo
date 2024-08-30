// PositionSelectionPopup.js
import React from 'react';

function PositionSelectionPopup({ handleLogoPositionChange }) {
  return (
    <div className="position-selection-popup">
      <h2>Select Logo Position</h2>
      <div className="position-selection-options">
        <button onClick={() => handleLogoPositionChange({ x: 0, y: 0 })}>Top Left</button>
        <button onClick={() => handleLogoPositionChange({ x: 0, y: 1 })}>Bottom Left</button>
        <button onClick={() => handleLogoPositionChange({ x: 1, y: 0 })}>Top Right</button>
        <button onClick={() => handleLogoPositionChange({ x: 1, y: 1 })}>Bottom Right</button>
      </div>
    </div>
  );
}

export default PositionSelectionPopup;
