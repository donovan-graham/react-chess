import React, { PropTypes } from 'react';


const Controls = ({ activeColor, handleToggle }) => {
  return (
    <div className="game-controls">
      <div>Player's turn: {activeColor}</div>
      <button onClick={handleToggle}>Swap view</button>
    </div>
  );
};

Controls.propTypes = {
  activeColor: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
}

export default Controls;
