import { motion } from "framer-motion";

export default function Tile({ value, onClick, isHint }) {
  if (value === 0) return <div className="w-24 h-24" />;

  return (
    <motion.button
      onClick={onClick}
      animate={
        isHint
          ? { scale: [1, 1.1, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.6, repeat: isHint ? Infinity : 0 }}
      className="w-28 h-28 relative"
    >
      <img
        src="/cloud-mask.svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        alt=""
      />

      <span className="relative z-10 text-white text-3xl font-semibold">
        {value}
      </span>
    </motion.button>
  );
}
