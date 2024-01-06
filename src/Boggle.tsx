import {
  useState,
  useEffect
} from "react";

import Button from 'react-bootstrap/Button';

import "bootstrap/scss/bootstrap.scss";

import { GameEvent, Listener } from './Controller';

import { BoggleController} from './BoggleController';

type Children = { children: React.ReactNode };

function msUntil(date: Date) {
    return Math.max(date.getTime() - Date.now(), 0);
}

export function Boggle() {
  const controller = BoggleController.getInstance();

  const [letters, setLetters] = useState(controller.getLetters());
  const [endTime, setEndTime] = useState(new Date());
  const [msLeft, setMsLeft] = useState(msUntil(endTime));
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setLetters(event.detail.letters);
      setEndTime(event.detail.endTime);
      setMsLeft(msUntil(event.detail.endTime));
      setInProgress(true);
    }
    controller.addEventListener('gameStart', handler);

    return () => {
      controller.removeEventListener('gameStart', handler);
    }
  }, [setLetters, setEndTime, setMsLeft]);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setLetters(event.detail.letters);
      setEndTime(event.detail.endTime);
      setMsLeft(0);
      setInProgress(false);
    }
    controller.addEventListener('gameOver', handler);

    return () => {
      controller.removeEventListener('gameOver', handler);
    }
  }, [setLetters, setEndTime, setMsLeft, setInProgress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inProgress && msLeft > 0) {
        const nextMs = msUntil(endTime);

        setMsLeft(nextMs);

        if (nextMs <= 0 && inProgress) {
          setInProgress(false);
          const alarm = new Audio(new URL('./alarm.wav', import.meta.url) as any as string);
          alarm.play();
        }
      }
    }, 950);

    return () => {
      clearTimeout(timeout);
    }
  }, [setMsLeft, msLeft, setInProgress]);

  const lettersPerRow = 4;
  let rows = [];
  let currentRow = [];

  for (let i = 0; i < letters.length; i++ ) {
    currentRow.push(<Letter key={ i }>{ letters[i] }</Letter>)

    if ((i + 1) % lettersPerRow === 0) {
      rows.push(<BoardRow key={ "row " + (i / lettersPerRow) }>
                    { currentRow }
                  </BoardRow>);
      currentRow = [];
    }
  }

  const startButton = <Button onClick={ () => controller.startNewGame() } size="lg">
                        Start
                      </Button>

  const stopButton = <Button onClick={ () => controller.endGame() }
                             size="lg"
                             variant="danger">
                       Stop
                     </Button>

  return <div>
           <CountDown miliseconds={ msLeft }/>

           { rows }

           <div className="d-flex flex-row justify-content-center pt-4">

             { inProgress ? stopButton : startButton }

           </div>
         </div>
}

function CountDown({ miliseconds }: { miliseconds: number }) {
  const seconds = Math.floor(miliseconds / 1000) % 60;
  const minutes = Math.floor((miliseconds / 1000) / 60);

  return <div className="text-center">
           <h4 className="display-4">
             { minutes.toString().padStart(2, "0") }:{ seconds.toString().padStart(2, "0") }
           </h4>
         </div>
}

function BoardRow({ children }: Children) {
  return <div className="d-flex flex-row justify-content-center">
           { children }
         </div>
}


function Letter({ children }: Children): React.JSX.Element {
  const size = "15vmin";
  const maxSize = "125px"
  return (
    <div className="d-flex flex-column border rounded"
         style={{ height: size,
                  width: size,
                  maxHeight: maxSize,
                  maxWidth: maxSize}}>
      <h2 className="display-2 text-center my-auto">
        { children }
      </h2>
    </div>
  )
}
