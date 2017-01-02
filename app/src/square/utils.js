import {
  BOARD_FILES,
} from '../utils/constants';


export const squareKey = (rank, file) => `${file}${rank}`;

export const squareColorInteger = (rank, file) =>
  BOARD_FILES.indexOf(file) + rank - 1;

export const squareColor = (int) =>
  int % 2 === 0 ? 'black' : 'white';
