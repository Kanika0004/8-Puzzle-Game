const goal = "123456780";

function manhattan(state) {
  let dist = 0;
  for (let i = 0; i < 9; i++) {
    const value = state[i];
    if (value === "0") continue;

    const goalIndex = goal.indexOf(value);
    const x1 = i % 3;
    const y1 = Math.floor(i / 3);
    const x2 = goalIndex % 3;
    const y2 = Math.floor(goalIndex / 3);

    dist += Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
  return dist;
}

function getNeighbors(state) {
  const zero = state.indexOf("0");
  const moves = [];
  const swaps = [
    zero - 3,
    zero + 3,
    zero - 1,
    zero + 1,
  ];

  for (const i of swaps) {
    if (
      i >= 0 &&
      i < 9 &&
      !(zero % 3 === 0 && i === zero - 1) &&
      !(zero % 3 === 2 && i === zero + 1)
    ) {
      const arr = state.split("");
      [arr[zero], arr[i]] = [arr[i], arr[zero]];
      moves.push(arr.join(""));
    }
  }
  return moves;
}

export function solveAStar(board) {
  const start = board.join("");
  if (start === goal) return [];

  const open = new Set([start]);
  const cameFrom = {};
  const gScore = { [start]: 0 };
  const fScore = { [start]: manhattan(start) };

  while (open.size) {
    let current = null;
    let best = Infinity;

    for (const s of open) {
      if (fScore[s] < best) {
        best = fScore[s];
        current = s;
      }
    }

    if (current === goal) {
      const path = [];
      while (cameFrom[current]) {
        path.unshift(current);
        current = cameFrom[current];
      }
      return path;
    }

    open.delete(current);

    for (const next of getNeighbors(current)) {
      const tentative = gScore[current] + 1;
      if (tentative < (gScore[next] ?? Infinity)) {
        cameFrom[next] = current;
        gScore[next] = tentative;
        fScore[next] = tentative + manhattan(next);
        open.add(next);
      }
    }
  }

  return [];
}
