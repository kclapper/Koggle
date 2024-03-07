import { useCallback } from 'react';

import Button from 'react-bootstrap/Button';

type StartStopProps = { started: boolean, onStart: () => void, onStop: () => void };
export default function StartStop({ started, onStart, onStop }: StartStopProps) {
  const handleStart = useCallback(() => {
    onStart();
  }, [onStart]);

  const handleStop = useCallback(() => {
    onStop();
  }, [onStop]);

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
