import { useEffect, useState } from "react";

export default function useTimer(active = true) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  function resetTimer() {
    setTime(0);
  }

  return { time, resetTimer };
}
