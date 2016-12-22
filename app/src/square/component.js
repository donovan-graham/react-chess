import React, { PropTypes } from 'react';
import classNames from 'classnames';


import {
  BOARD_FILES,
  PIECE_TO_SYMBOL_MAP,
  COLOR_TO_PIECES_MAP,
} from '../utils/constants';

// row == rank (1...8)
// col == file (a...h)

const squareInt = (rank, file) =>
  BOARD_FILES.indexOf(file) + rank - 1;

const squareKey = (rank, file) => `${file}${rank}`;

const squareColor = (int) =>
  int % 2 === 0 ? 'black' : 'white';

const Square = ({ rank, file, pieces, activeColor }) => {
  const color = squareColor(squareInt(rank, file));
  const square = squareKey(rank, file);

  const piece = pieces[square];
  const hasPiece = !!piece;
  const symbol = (hasPiece && PIECE_TO_SYMBOL_MAP[piece]) || '';

  const canSelect = hasPiece && COLOR_TO_PIECES_MAP[activeColor].indexOf(piece) !== -1;

  const activeSquare = 'e2';
  const availableMoves = ['e3', 'e4'];

  const isActive = square === activeSquare;
  const isMove = availableMoves.indexOf(square) !== -1;

  const styles = classNames(color, {
    'is-active': isActive,
    'is-move': isMove,
    'can-select': canSelect,
  });


  return (
    <td className={styles} onClick={()=> isMove && console.log(square)}>{symbol}</td>
  );
};

Square.propTypes = {
  rank: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,

  pieces: PropTypes.object.isRequired,
  activeColor: PropTypes.string.isRequired,
};

export {
  squareColor,
  squareInt,
  squareKey,
};

export default Square;
