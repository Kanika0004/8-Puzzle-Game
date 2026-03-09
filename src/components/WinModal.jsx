export default function WinModal({
  moves,

  time,

  resetGame,
}) {
  return (
    <div
      className="

fixed
inset-0

flex
items-center
justify-center

bg-black/40

"
    >
      <div className="bg-white p-8 rounded-xl">
        <h2>You Won!</h2>

        <p>Moves: {moves}</p>

        <p>Time: {time}</p>

        <button onClick={resetGame} className="bg-sky-500 p-3 rounded">
          Play Again
        </button>
      </div>
    </div>
  );
}
