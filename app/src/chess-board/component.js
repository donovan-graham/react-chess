import React, { PropTypes } from 'react';

import Square from '../square';
import './style.css';

const xs = [0,10,20,30,40,50,60,70];
const ys = [0,1,2,3,4,5,6,7].reverse();

const Row = ({ y }) => {
  const cols = xs.map(x => <Square key={x + y} pos={x + y} />);
  return <tr data-row={y}>{cols}</tr>;
};

Row.propTypes = {
  y: PropTypes.number.isRequired,
};

const ChessBoard = () => {
  const rows = ys.map(y => <Row key={y} y={y} />);
  return (
    <div>
      <table cellPadding={0} cellSpacing={1} className="chess-board">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export { Row };
export default ChessBoard;
