import { useState, useCallback } from 'react';

import Button from 'react-bootstrap/Button';

type StartStopProps = { onStart: () => void, onStop: () => void };
export default function StartStop({ onStart, onStop }: StartStopProps) {
  const [started, setStarted] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);
    onStart();
  }, [setStarted, onStart]);

  const handleStop = useCallback(() => {
    setStarted(false);
    onStop();
  }, [setStarted, onStop]);

  const startButton = <Button onClick={handleStart} size="lg">
                        Start
                      </Button>

  const stopButton = <Button onClick={handleStop}
                             size="lg"
                             variant="danger">
                       Stop
                     </Button>

  return (
    <div className="d-flex flex-row justify-content-center pt-4">
      { started ? stopButton : startButton }
    </div>
  )
}
