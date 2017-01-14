import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
  PIECE_TO_CSS_CLASS_NAME_MAP,
  COLOR_TO_PIECES_MAP,
} from '../utils/constants';
import {
  squareColor,
} from './utils';


const Square = ({ pos, pieces, activeColor, activeSquare, availableMoves, onSelect, onMove }) => {
  const color = squareColor(pos);

  const piece = pieces[pos];
  const hasPiece = !!piece;
  const fullName = (hasPiece && PIECE_TO_CSS_CLASS_NAME_MAP[piece]) || '';

  const canSelect = hasPiece && COLOR_TO_PIECES_MAP[activeColor].indexOf(piece) !== -1;

  const isActive = pos === activeSquare;
  const moveAction = availableMoves[pos];
  const isMove = !!moveAction;

  const onClick = () => {
    if (canSelect) {
      return onSelect(pos);
    }
    if (isMove) {
      return onMove(moveAction);
    }
    return;
  };

  const styles = classNames(color, {
    'is-active': isActive,
    'is-move': isMove,
    'can-select': canSelect,
  });

  return (
    <td data-square={pos} className={styles} onClick={() => onClick()}>
      <div className={fullName}></div>
    </td>
  );
};

Square.propTypes = {
  pos: PropTypes.number.isRequired,

  pieces: PropTypes.object.isRequired,
  activeColor: PropTypes.string.isRequired,
  activeSquare: PropTypes.number,
  availableMoves: PropTypes.object.isRequired,
  
  onSelect: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Square;
