import React, { PropTypes } from 'react';

export function getGameStateMessage(isEndOfGame, isCheck, activeColor) {
  if (isEndOfGame && isCheck) {
    return `Game has ended - ${activeColor} is checkmated`;
  }
  if (isEndOfGame && !isCheck) {
    return 'Game has ended - stalemate';
  }
  if (!isEndOfGame && isCheck) {
    return `${activeColor}'s turn to play and is in check`;
  }
  return  `${activeColor}'s turn to play`;
}

export function hasGameEnded(moves) {
  return Object.keys(moves).length === 0;
}

const Controls = ({ activeColor, moves, isCheck, handleToggle }) => {
  const isEndOfGame = hasGameEnded(moves);
  const message = getGameStateMessage(isEndOfGame, isCheck, activeColor);

  return (
    <div className="game-controls">
      <div>{message}</div>
      <button onClick={handleToggle}>Swap view</button>
    </div>
  );
};

Controls.propTypes = {
  activeColor: PropTypes.string.isRequired,
  isCheck: PropTypes.bool.isRequired,
  moves: PropTypes.object.isRequired,

  handleToggle: PropTypes.func.isRequired,
}

export default Controls;
