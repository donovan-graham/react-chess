import React, { PropTypes } from 'react';

import './style.css';

// rank and file
const cols = Array.from('abcdefgh');
const rows = Array.of(1, 2, 3, 4, 5, 6, 7, 8);

const getCellValue = (row, col) =>
  cols.indexOf(col) + row - 1;

const getCellLabel = (row, col) => `${row}${col.toUpperCase()}`;

const getCellStyle = (cellValue) =>
  cellValue % 2 === 0 ? 'black' : 'white';


const Cell = ({ row, col }) => {
  const cellValue = getCellValue(row, col);
  const cellStyle = getCellStyle(cellValue);
  const cellLabel = getCellLabel(row, col);
  return (
    <td className={cellStyle}>{cellLabel}</td>
  );
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.string.isRequired,
};


const Row = ({ row }) => {
  const cells = cols.map(c => <Cell key={c} row={row} col={c} />);
  return <tr>{cells}</tr>;
};

Row.propTypes = {
  row: PropTypes.number.isRequired,
};


const ChessBoard = () => {
  const board = rows.reverse().map(r => <Row key={r} row={r} />);
  return (
    <table className="chess-board">
      <tbody>
        {board}
      </tbody>
    </table>
  );
};

export {
  cols,
  rows,
  getCellStyle,
  getCellValue,
  getCellLabel,
  Cell,
  Row,
};
export default ChessBoard;
