import {
  COLOR_WHITE,
  COLOR_BLACK,
} from './constants';

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
  const simpleRanks = fen.split(' ')[0].split('/');

  const filledRanks = simpleRanks.map(rankString =>
    Array.from(replaceEmptyCounterWithChar(rankString, emptyChar)));

  const board = filledRanks.map((rankString, y) =>
    rankString.reduce((acc, char, x) => {
      const square = (x * 10) + (7 - y);
      acc[square] = (char === emptyChar) ? null : char;
      return acc;
    }, {}));

  return Object.assign({}, ...board);
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
