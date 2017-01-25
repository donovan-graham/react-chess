import React, { PropTypes } from 'react';
import classNames from 'classnames';

// import { COLOR_TO_PIECES_MAP } from '../utils/constants';
import Piece from '../piece';
import { squareColor } from './utils';



const Square = ({ pos, board, activeColor, activePos, moves, availableMoves, onSelect, onMove }) => {

  const color = squareColor(pos);
  const isActive = pos === activePos;

  const piece = board[pos];
  const hasPiece = !!piece;

  const canSelect = hasPiece && !!moves[pos];

  const moveAction = (moves[activePos] && moves[activePos][pos]) || null;
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

  board: PropTypes.object.isRequired,
  activeColor: PropTypes.string.isRequired,
  activePos: PropTypes.number,
  moves: PropTypes.object.isRequired,
  availableMoves: PropTypes.object.isRequired,

  onSelect: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Square;
