import React, { PropTypes } from 'react';

import {
  BOARD_FILES,
  PIECE_TO_SYMBOL_MAP,
} from '../utils/constants';

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

export {
  squareStyle,
  squareValue,
  squareLabel,
};

export default Square;
