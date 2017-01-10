import {
  BOARD_FILES,
} from '../utils/constants';


export const squareCoOrdinates = (square) => {
  const [file, rank] = square.split('');
  return {
    file,
    rank: parseInt(rank, 10),
  };
};

export const squareKey = (rank, file) => `${file}${rank}`;

export const squareColorInteger = (rank, file) =>
  BOARD_FILES.indexOf(file) + rank - 1;

export const squareColor = (int) =>
  int % 2 === 0 ? 'black' : 'white';
