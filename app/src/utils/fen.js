import { COLOR_WHITE, COLOR_BLACK, BOARD_FILES } from './constants';

function replaceEmptyCounterWithChar(str, char = '.', counter = 8) {
  if (counter < 1) {
    return str;
  } else {
    const newStr = str.replace(counter, char.repeat(counter))
    return replaceEmptyCounterWithChar(newStr, char, counter - 1);
  }
}

function getBoardStateFromFEN(fen) {
  const emptyChar = '.';
  const simpleRows = fen.split(' ')[0].split('/');

  const filledRows = simpleRows.map(str =>
    Array.from(replaceEmptyCounterWithChar(str, emptyChar)));

  const mappedRows = filledRows.map((row, i) =>
    row.reduce((acc, piece, j) => {
      if (piece !== emptyChar) {
        const rank = 8 - i;
        const file = BOARD_FILES[j];
        const square = `${file}${rank}`
        acc[square] = piece;
      }
      return acc;
    }, {}));

  return Object.assign({}, ...mappedRows);
}

function getEnPassantTargetSquareFromFEN(fen) {
 const enPassant = fen.split(' ')[3];
 return (enPassant === '-') ? undefined : enPassant;
}

function getFullMoveCountFromFEN(fen) {
 return parseInt(fen.split(' ')[5], 10);
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
