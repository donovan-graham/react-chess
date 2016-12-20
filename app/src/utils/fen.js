import { COLOR_WHITE, COLOR_BLACK } from './constants';

// const pieceRegex = /[rnbqkbnrpRNBQKBNRP]/;
const cols = Array.from('abcdefgh');

export const FEN_START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function replaceCounter(str, placeholder = '.', counter = 8) {
  if (counter < 1) {
    return str;
  } else {
    const newStr = str.replace(counter, placeholder.repeat(counter))
    return replaceCounter(newStr, placeholder, counter - 1);
  }
}

function getBoardStateFromFEN(fen) {
  const placeholder = '.';
  const simpleRows = fen.split(' ')[0].split('/');
  const filledRows = simpleRows.map(str => replaceCounter(str).split(''));

  const algebraicRows = filledRows.map((arr, r) =>
    arr.reduce((acc, piece, c) => {
      if (piece !== placeholder) {
        const row = 8 - r;
        const col = cols[c];
        const square = `${col}${row}`
        acc[square] = piece;
      }
      return acc;
    }, {}));

  return Object.assign({}, ...algebraicRows);
}

function getEnPassantTargetSquareFromFEN(fen) {
 const enPassant = fen.split(' ')[3];
 return (enPassant === '-') ? undefined : enPassant;
}

function getFullMoveCountFromFEN(fen) {
 return parseInt(fen.split(' ')[5]);
}

function getActiveColorFromFEN(fen) {
 const color = fen.split(' ')[1];
 return (color === 'w') ? COLOR_WHITE : COLOR_BLACK;
}

export {
  getBoardStateFromFEN,
  getEnPassantTargetSquareFromFEN,
  getActiveColorFromFEN,
  getFullMoveCountFromFEN,
}
