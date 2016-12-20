import React, { PropTypes } from 'react';

import { BOARD_FILES, BOARD_RANKS } from '../utils/constants';

import './style.css';

// row == rank (1...8)
// col == file (a...h)

const squareValue = (rank, file) =>
  BOARD_FILES.indexOf(file) + rank - 1;

const squareLabel = (rank, file) => `${file}${rank}`;

const squareStyle = (value) =>
  value % 2 === 0 ? 'black' : 'white';


const Square = ({ rank, file }) => {
  const value = squareValue(rank, file);
  const style = squareStyle(value);
  const label = squareLabel(rank, file);
  return (
    <td className={style}>{label}</td>
  );
};

Square.propTypes = {
  rank: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
};


const Rank = ({ rank }) => {
  const files = BOARD_FILES.map(file => <Square key={file} rank={rank} file={file} />);
  return <tr>{files}</tr>;
};

Rank.propTypes = {
  rank: PropTypes.number.isRequired,
};

const ChessBoard = () => {
  const ranks = BOARD_RANKS.reverse().map(rank => <Rank key={rank} rank={rank} />);
  return (
    <table className="chess-board">
      <tbody>
        {ranks}
      </tbody>
    </table>
  );
};

export {
  squareStyle,
  squareValue,
  squareLabel,
  Square,
  Rank,
};
export default ChessBoard;
