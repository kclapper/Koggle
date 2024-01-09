import { useState, useEffect, useCallback } from "react";

import "bootstrap/scss/bootstrap.scss";

import { Controller } from './controllers/Controller';
import { RegularBoggle } from './controllers/RegularBoggle';
import { BigBoggle } from './controllers/BigBoggle';
import { AllEs } from './controllers/AllEs';

import Countdown from './components/Countdown';
import Board from './components/Board';
import StartStop from './components/StartStop';

import { Solver } from './solver/Solver';

import { BoggleVariant } from "./util";
import { Solution } from "./components/Solution";

function getController(variant: BoggleVariant): Controller {
  switch (variant) {
    case "4x4":
      return RegularBoggle.getInstance();
    case "5x5":
      return BigBoggle.getInstance();
    case "Es":
      return AllEs.getInstance();
  }
}

type BoggleProps = { variant?: BoggleVariant, controller: Controller }
export function Boggle({ variant = "4x4", controller = getController(variant) }: BoggleProps) {
  const [endTime, setEndTime] = useState(new Date());
  const [solution, setSolution] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setEndTime(event.detail.endTime);
      setSolution(new Solver(controller).possibleWords());
    }
    controller.addEventListener('gameStart', handler);
    controller.addEventListener('gameStop', handler);

    return () => {
      setSolution(undefined);
      controller.removeEventListener('gameStart', handler);
      controller.removeEventListener('gameStop', handler);
    }
  }, [controller, setEndTime, setSolution]);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setEndTime(event.detail.endTime);

      const alarm = new Audio(new URL('./alarm.wav', import.meta.url) as any as string);
      alarm.play();
    }
    controller.addEventListener('gameOver', handler);

    return () => {
      controller.removeEventListener('gameOver', handler);
    }
  }, [controller, setEndTime]);

  const handleStart = useCallback(() => {
    controller.startGame();
  }, [controller]);

  const handleStop = useCallback(() => {
    controller.stopGame();
  }, [controller]);

  const inProgress = endTime > new Date();

  return (
    <div>
     <Countdown endTime={ endTime }/>

     <Board letters={ controller.getBoard() } size={ controller.getSize() } />

     <StartStop started={inProgress} onStart={handleStart} onStop={handleStop} />

     <Solution show={ !inProgress } solution={ solution } />

    </div>
  )
}