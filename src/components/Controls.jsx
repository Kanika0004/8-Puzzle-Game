export default function Controls({ moves, time, hints, hint, reset }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">

      {/* ROW 1 : STATS BAR */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-md">
        <div className="flex gap-8 text-[#1F3A5F] font-semibold">

          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[10px] tracking-wide opacity-70">MOVES</span>
            <span className="font-mono text-xl">{moves}</span>
          </div>

          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[10px] tracking-wide opacity-70">TIME</span>
            <span className="font-mono text-xl">{time}s</span>
          </div>

          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[10px] tracking-wide opacity-70">HINTS</span>
            <span className="font-mono text-xl">{hints}</span>
          </div>

        </div>
      </div>

      {/* ROW 2 : BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={hint}
          className="px-5 py-2 rounded-full bg-white text-[#1F3A5F] font-medium shadow-md active:scale-95 hover:scale-105 transition"
        >
          Hint
        </button>

        <button
          onClick={reset}
          className="px-5 py-2 rounded-full bg-white text-[#1F3A5F] font-medium shadow-md active:scale-95 hover:scale-105 transition"
        >
          Reset
        </button>
      </div>

    </div>
  );
}