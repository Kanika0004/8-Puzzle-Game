import { motion } from "framer-motion";

export default function Guidelines({ close }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-black border-2 border-cyan-400 p-8 rounded-2xl text-white max-w-md shadow-2xl neon-tile"
      >
        <h2 className="text-2xl font-bold mb-4 neon-text">
          🎮 How To Play
        </h2>

        <ul className="space-y-2 text-sm">
          <li>🔹 Click a tile next to empty space to move it.</li>
          <li>🔹 Arrange numbers from 1 to 8.</li>
          <li>🔹 Empty space should be bottom-right.</li>
          <li>🔹 Try solving in minimum moves!</li>
        </ul>

        <button
          onClick={close}
          className="mt-6 px-6 py-2 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
