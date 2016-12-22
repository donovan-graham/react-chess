import React, { PropTypes } from 'react';

import Square from '../square';

import {
  BOARD_FILES,
  BOARD_RANKS,
} from '../utils/constants';

import './style.css';

const Rank = ({ rank }) => {
  const files = BOARD_FILES.map(file => <Square key={file} rank={rank} file={file} />);
  return <tr>{files}</tr>;
};

Rank.propTypes = {
  rank: PropTypes.number.isRequired,
};

const ChessBoard = () => {
  const ranks = [...BOARD_RANKS].reverse().map(rank => <Rank key={rank} rank={rank} />);
  return (
    <div>
      <table className="chess-board">
        <tbody>
          {ranks}
        </tbody>
      </table>
    </div>
  );
};

export { Rank };
export default ChessBoard;
