export function isSolved(board) {
  return board.every((v, i) => (i === 8 ? v === 0 : v === i + 1));
}
