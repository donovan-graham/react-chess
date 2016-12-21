import React, { PropTypes } from 'react';

import {
  BOARD_FILES,
  BOARD_RANKS,
  PIECE_TO_SYMBOL_MAP,
} from '../utils/constants';

import './style.css';

// row == rank (1...8)
// col == file (a...h)

const squareValue = (rank, file) =>
  BOARD_FILES.indexOf(file) + rank - 1;

const squareLabel = (rank, file) => `${file}${rank}`;

const squareStyle = (value) =>
  value % 2 === 0 ? 'black' : 'white';


const Square = ({ rank, file, pieces }) => {
  const value = squareValue(rank, file);
  const style = squareStyle(value);
  const label = squareLabel(rank, file);

  const piece = pieces[label];
  const symbol = piece ? PIECE_TO_SYMBOL_MAP[piece] : '';

  return (
    <td className={style}>{symbol}</td>
  );
};

Square.propTypes = {
  rank: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
  pieces: PropTypes.object.isRequired,
};


const Rank = ({ rank, pieces }) => {
  const files = BOARD_FILES.map(file => <Square key={file} rank={rank} file={file} pieces={pieces}/>);
  return <tr>{files}</tr>;
};

Rank.propTypes = {
  rank: PropTypes.number.isRequired,
  pieces: PropTypes.object.isRequired,
};

const ChessBoard = ({ pieces }) => {
  const ranks = BOARD_RANKS.reverse().map(rank => <Rank key={rank} rank={rank} pieces={pieces} />);
  return (
    <table className="chess-board">
      <tbody>
        {ranks}
      </tbody>
    </table>
  );
};

Rank.propTypes = {
  pieces: PropTypes.object.isRequired,
};


export {
  squareStyle,
  squareValue,
  squareLabel,
  Square,
  Rank,
};
export default ChessBoard;
