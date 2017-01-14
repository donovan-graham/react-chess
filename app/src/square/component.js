import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
  PIECE_TO_CSS_CLASS_NAME_MAP,
  COLOR_TO_PIECES_MAP,
} from '../utils/constants';
import {
  squareColor,
} from './utils';


// row == rank (1...8)
// col == file (a...h)
const noOp = () => {
  console.log("noOp");
};

const Square = ({ pos, pieces, activeColor, activeSquare, availableMoves, onSelectSquare, onMoveToSquare }) => {
  const color = squareColor(pos);

  const piece = pieces[pos];
  const hasPiece = !!piece;
  const fullName = (hasPiece && PIECE_TO_CSS_CLASS_NAME_MAP[piece]) || '';

  const canSelect = hasPiece && COLOR_TO_PIECES_MAP[activeColor].indexOf(piece) !== -1;

  const isActive = pos === activeSquare;
  const isMove = availableMoves.indexOf(pos) !== -1;

  const onClick = (canSelect) ? onSelectSquare : (isMove) ? onMoveToSquare : noOp;

  const styles = classNames(color, {
    'is-active': isActive,
    'is-move': isMove,
    'can-select': canSelect,
  });

  return (
    <td data-square={pos} className={styles} onClick={() => onClick(pos)}>
      <div className={fullName}></div>
    </td>
  );
};

Square.propTypes = {
  pos: PropTypes.number.isRequired,

  pieces: PropTypes.object.isRequired,
  activeColor: PropTypes.string.isRequired,
  activeSquare: PropTypes.number,
  availableMoves: PropTypes.array.isRequired,

  onSelectSquare: PropTypes.func.isRequired,
  onMoveToSquare: PropTypes.func.isRequired,
};

export default Square;
