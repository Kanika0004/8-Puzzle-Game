// import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import Board from "./components/Board";
import Controls from "./components/Controls";
import useTimer from "./hooks/useTimer";

import { generateBoard } from "./utils/shuffle";
import { solveAStar } from "./utils/aStar";
import { isSolved } from "./utils/helpers";

let audioCtx = null;

function playClick() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // ✅ required on mobile: resume in user gesture
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(700, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      900,
      audioCtx.currentTime + 0.06,
    );

    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {
    console.log("Sound blocked:", e);
  }
}

export default function App() {
  // -----------------------------
  // States
  // -----------------------------
  const { width, height } = useWindowSize();
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [board, setBoard] = useState(generateBoard("Easy"));
  const [moves, setMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solutionPath, setSolutionPath] = useState([]);
  const [hintIndex, setHintIndex] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBest, setShowBest] = useState(false);
  const [bestGame, setBestGame] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);

  const solved = isSolved(board);
  const { time, resetTimer } = useTimer(started && hasMoved && !solved);

  // -----------------------------
  // Effects & best game tracking
  // -----------------------------
  useEffect(() => {
    if (!started) return;
    if (!solved) return;
    if (moves === 0) return;

    setShowConfetti(true);

    const gameStats = { moves, time, hintsUsed, difficulty };

    const storedBest = JSON.parse(localStorage.getItem("bestGame"));

    const isBetter =
      !storedBest ||
      gameStats.moves < storedBest.moves ||
      (gameStats.moves === storedBest.moves &&
        gameStats.time < storedBest.time) ||
      (gameStats.moves === storedBest.moves &&
        gameStats.time === storedBest.time &&
        gameStats.hintsUsed < storedBest.hintsUsed);

    if (isBetter) {
      console.log("SAVING BEST GAME:", gameStats);
      localStorage.setItem("bestGame", JSON.stringify(gameStats));
      setBestGame(gameStats);
    }

    const t = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(t);
  }, [started, solved, moves, time, hintsUsed, difficulty]);
  useEffect(() => {
    console.log("BOARD:", board.join(""), "SOLVED?", solved);
  }, [board, solved]);

  // =============================
  // SAVE BEST GAME
  // =============================
  useEffect(() => {
    const storedBest = JSON.parse(localStorage.getItem("bestGame"));
    if (storedBest) setBestGame(storedBest);
  }, []);

  // -----------------------------
  // Functions
  // -----------------------------
  function moveTile(i) {
    const empty = board.indexOf(0);
    const valid = [i - 3, i + 3, i - 1, i + 1].includes(empty);
    if (!valid) return;

    // start timer on first valid move
    if (!hasMoved) {
      setHasMoved(true);
    }

    playClick();

    const newBoard = [...board];
    [newBoard[i], newBoard[empty]] = [newBoard[empty], newBoard[i]];

    setBoard(newBoard);
    setMoves((m) => m + 1);
    setHintIndex(null);
    setSolutionPath([]);
  }

  function showHint() {
    let path = solutionPath;
    if (path.length === 0) {
      path = solveAStar(board);
      setSolutionPath(path);
      setHintsUsed((h) => h + 1);
      if (path.length === 0) return;
    }

    const nextState = path[0];
    const nextBoard = nextState.split("").map(Number);

    const emptyNow = board.indexOf(0);
    const emptyNext = nextBoard.indexOf(0);

    // The tile that moves INTO the empty spot
    const tileToMove = emptyNext;

    setHintIndex(tileToMove);
    setSolutionPath(path.slice(1));

    setTimeout(() => setHintIndex(null), 1200);
  }

  function reset() {
    setShowConfetti(false); // stop confetti
    setBoard(generateBoard(difficulty));
    setMoves(0);
    setHintsUsed(0);
    setHasMoved(false); // ⬅️ important: timer waits for first move again
    setHintIndex(null);
    setSolutionPath([]);
    resetTimer();
  }

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src="/bg1.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false} // ✅ important
          numberOfPieces={220}
          gravity={0.25}
        />
      )}

      {/* Top Right Buttons */}
      {/* Best Game - stays top right */}
      <button
        onClick={() => setShowBest(true)}
        className="absolute top-8 right-4 z-20 w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full shadow-lg text-white hover:scale-110 transition"
      >
        🏆
      </button>

      {/* Help / Guidelines - bottom right */}
      <button
        onClick={() => setShowHelp(true)}
        className="absolute bottom-8 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg text-[#1F3A5F] hover:scale-110 transition"
      >
        ?
      </button>

      {!started && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-md px-12 py-10 rounded-[40px] shadow-2xl text-center animate-fadeIn">
            {/* Cloud icon */}
            <img
              src="/start-cloud.png"
              className="w-20 mx-auto mb-4 animate-float rounded-2xl"
            />

            {/* Title */}
            <h1 className="rubik-bubble-title text-5xl text-[#1F3A5F] mb-3">
              8-Puzzle
            </h1>

            <p className="text-[#1F3A5F]/70 mb-6">
              Slide the tiles. Solve the puzzle.
            </p>

            {/* Start button */}
            <button
              onClick={() => {
                setShowConfetti(false); // ✅ important
                setBoard(generateBoard(difficulty));
                resetTimer();
                setMoves(0);
                setHintsUsed(0);
                setStarted(true);
                setHasMoved(false);
              }}
              className="
bg-[#4FA3E3]
text-white
px-10
py-4
rounded-full
text-xl
shadow-md
hover:bg-[#7FC2E5]
hover:scale-105
active:scale-95
transition
duration-200
"
            >
              ▶ Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-[90%]">
        <h1
          className="
          rubik-bubble-title
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          text-center
          mb-10
          leading-tight
        "
        >
          8&nbsp;-&nbsp;PUZZLE&nbsp;GAME
        </h1>

        {/* ✅ Difficulty Selector BELOW Title */}
        <div className="mb-6">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="
            text-[11px]
            px-3
            py-1
            rounded-full
            bg-white/90
            backdrop-blur-md
            shadow-md
            text-[#1F3A5F]
            font-semibold
            outline-none
            border border-white/60
            "
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {started && (
          <Board board={board} onMove={moveTile} hintIndex={hintIndex} />
        )}

        {started && (
          <Controls
            moves={moves}
            time={time}
            hints={hintsUsed}
            hint={showHint}
            reset={reset}
          />
        )}

        {/* SOLVED Overlay */}
        {solved && (
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 px-8 py-5 rounded-2xl shadow-xl text-center">
              {/* Title Row */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/win-img.png" // your image in public folder
                  alt="solved"
                  className="w-14 h-14 object-contain"
                />

                <h2 className="rubik-bubble-title text-4xl text-[#1F3A5F]">
                  SOLVED!
                </h2>
              </div>

              <p className="mt-2 text-[#1F3A5F]">
                Time: {time}s · Moves: {moves}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guidelines modal */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-[#1F3A5F]">
              How to Play
            </h2>

            <p className="mb-3 text-sm">Arrange tiles in this order:</p>

            {/* GRID */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                1
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                2
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                3
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                4
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                5
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                6
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                7
              </div>

              <div className="bg-[#8EC9E8] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                8
              </div>

              <div className="bg-gray-200 w-12 h-12 rounded-lg"></div>
            </div>

            <ul className="text-sm space-y-1 mb-4">
              <li>Slide tiles into empty space</li>

              <li>Only adjacent tiles move</li>

              <li>Complete to win</li>
            </ul>

            <button
              onClick={() => setShowHelp(false)}
              className="bg-[#1F3A5F] text-white px-4 py-1 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Best Game Modal */}
      {showBest && bestGame && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 shadow-xl text-center animate-fadeIn">
            <h2 className="rubik-bubble-title text-3xl text-[#1F3A5F] mb-4">
              🏆 BEST GAME
            </h2>

            <div className="space-y-2 text-[#1F3A5F]">
              <p>Difficulty: {bestGame.difficulty}</p>

              <p>Moves: {bestGame.moves}</p>

              <p>Time: {bestGame.time}s</p>

              <p>Hints: {bestGame.hintsUsed}</p>
            </div>

            <button
              onClick={() => setShowBest(false)}
              className="
        mt-4
        bg-[#1F3A5F]
        text-white
        px-5
        py-2
        rounded-full
        hover:scale-110
        transition
        "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
