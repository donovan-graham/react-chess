export const squareColor = (pos) => {
  const val = Math.floor(pos / 10) + (pos % 10);
  return val % 2 === 0 ? 'black' : 'white';
}
