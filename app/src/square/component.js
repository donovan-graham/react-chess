import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
  COLOR_TO_PIECES_MAP,
} from '../utils/constants';
import {
  squareColor,
} from './utils';

import Piece from '../piece';


const Square = ({ pos, pieces, activeColor, activeSquare, availableMoves, onSelect, onMove }) => {
  const color = squareColor(pos);

  const piece = pieces[pos];
  const hasPiece = !!piece;

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
      { hasPiece && <Piece piece={piece} /> }
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
