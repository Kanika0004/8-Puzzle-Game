import Tile from "./Tile";

export default function Board({ board, onMove, hintIndex }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {board.map((tile, i) => (
        <Tile
          key={i}
          value={tile}
          onClick={() => onMove(i)}
          isHint={i === hintIndex}
        />
      ))}
    </div>
  );
}
