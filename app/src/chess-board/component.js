import React, { PropTypes } from 'react';

import { COLOR_WHITE } from '../utils/constants';
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

const Board = ({ view }) => {
  const style = (view === COLOR_WHITE) ? 'chess-board white-view' : 'chess-board black-view';

  const rows = ys.map(y => <Row key={y} y={y} />);
  return (
    <div>
      <table className={style} cellPadding={0} cellSpacing={1}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

Board.propTypes = {
  view: PropTypes.string.isRequired,
};

export { Row };
export default Board;
