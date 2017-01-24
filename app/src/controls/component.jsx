import React, { PropTypes } from 'react';


const Controls = ({ activeColor, isCheckMate, handleToggle }) => {
  return (
    <div className="game-controls">
      <div>Player's turn: {activeColor} {isCheckMate && '<== checkmate'}</div>
      <button onClick={handleToggle}>Swap view</button>
    </div>
  );
};

Controls.propTypes = {
  activeColor: PropTypes.string.isRequired,
  isCheckMate: PropTypes.bool.isRequired,

  handleToggle: PropTypes.func.isRequired,
}

export default Controls;
