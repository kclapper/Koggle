import { useState, useEffect } from 'react';

export default function CountDown({ endTime }: { endTime: Date }) {
  const [msLeft, setMsLeft] = useState(0);

  useEffect(() => {
    setMsLeft(msUntil(endTime));
  }, [endTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (msLeft > 0) {
        setMsLeft(msUntil(endTime));
      }
    }, 550);

    return () => {
      clearTimeout(timeout);
    }
  }, [msLeft, setMsLeft]);

  const seconds = Math.floor(msLeft / 1000) % 60;
  const minutes = Math.floor((msLeft / 1000) / 60);

  return (
    <div className="text-center">
      <h4 className="display-4">
        { minutes.toString().padStart(2, "0") }:{ seconds.toString().padStart(2, "0") }
      </h4>
    </div>
  )
}

function msUntil(date: Date) {
    return Math.max(date.getTime() - Date.now(), 0);
}