import {
  COLOR_WHITE,
  COLOR_BLACK,
} from './constants';

function getBoardStateFromFEN(fen) {
  const rankStr = fen.split(' ')[0]
    .replace(/8/g, '********')
    .replace(/7/g, '*******')
    .replace(/6/g, '******')
    .replace(/5/g, '*****')
    .replace(/4/g, '****')
    .replace(/3/g, '***')
    .replace(/2/g, '**')
    .replace(/1/g, '*');

  const ranks = rankStr
    .split('/')
    .map(str => Array.from(str))
    .map((rank, y) =>
      rank.reduce((acc, char, x) => {
        const pos = (x * 10) + (7 - y);
        acc[pos] = (char === '*') ? null : char;
        return acc;
      }, {}));

  return Object.assign({}, ...ranks);
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
