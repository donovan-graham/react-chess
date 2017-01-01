import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
  PIECE_TO_SYMBOL_MAP,
  COLOR_TO_PIECES_MAP,
} from '../utils/constants';
import {
  squareInt,
  squareKey,
  squareColor,
} from './utils';


// row == rank (1...8)
// col == file (a...h)
const noOp = () => {
  console.log("noOp");
};

const Square = ({ rank, file, pieces, activeColor, activeSquare, availableMoves, onSelectSquare, onMoveToSquare }) => {
  const color = squareColor(squareInt(rank, file));
  const square = squareKey(rank, file);

  const piece = pieces[square];
  const hasPiece = !!piece;
  const symbol = (hasPiece && PIECE_TO_SYMBOL_MAP[piece]) || '';

  const canSelect = hasPiece && COLOR_TO_PIECES_MAP[activeColor].indexOf(piece) !== -1;

  const isActive = square === activeSquare;
  const isMove = availableMoves.indexOf(square) !== -1;

  const onClick = (canSelect) ? onSelectSquare : (isMove) ? onMoveToSquare : noOp;

  const styles = classNames(color, {
    'is-active': isActive,
    'is-move': isMove,
    'can-select': canSelect,
  });


  return (
    <td data-square={square} className={styles} onClick={() => onClick(square)}>{symbol}</td>
  );
};

Square.propTypes = {
  rank: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,

  pieces: PropTypes.object.isRequired,
  activeColor: PropTypes.string.isRequired,
  activeSquare: PropTypes.string.isRequired,
  availableMoves: PropTypes.array.isRequired,

  onSelectSquare: PropTypes.func.isRequired,
  onMoveToSquare: PropTypes.func.isRequired,
};

export {
  squareColor,
  squareInt,
  squareKey,
};

export default Square;
