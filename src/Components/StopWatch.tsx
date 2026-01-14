import { useEffect, useState } from "react";

type StopwatchProps = {
  title: string;
};

const Stopwatch = ({ title }: StopwatchProps) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isRunning) {
      timer = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-zinc-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4 text-center">
        {title}
      </h2>

      <div className="text-5xl font-mono text-center text-white mb-6 tracking-widest">
        {formatTime(time)}
      </div>

      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg 
                       hover:bg-emerald-700 transition active:scale-95"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="px-4 py-2 bg-amber-500 text-black rounded-lg 
                       hover:bg-amber-600 transition active:scale-95"
          >
            Pause
          </button>
        )}

        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
