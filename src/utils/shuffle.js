// shuffle.js

const GOAL = [1,2,3,4,5,6,7,8,0];

export function generateBoard(difficulty="Easy") {

  let moves = 20;

  if (difficulty === "Medium") moves = 60;
  if (difficulty === "Hard") moves = 120;

  let board = [...GOAL];

  for (let i = 0; i < moves; i++) {

    const empty = board.indexOf(0);

    const possible = [];

    if (empty > 2) possible.push(empty - 3);
    if (empty < 6) possible.push(empty + 3);
    if (empty % 3 !== 0) possible.push(empty - 1);
    if (empty % 3 !== 2) possible.push(empty + 1);

    const move = possible[Math.floor(Math.random()*possible.length)];

    [board[empty], board[move]] = [board[move], board[empty]];
  }

  return board;
}