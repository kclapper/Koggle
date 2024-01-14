import { useState, useEffect, useCallback } from "react";

import "bootstrap/scss/bootstrap.scss";

import { Controller, GameEvent } from './controllers/Controller';
import { getController, BoggleVariant } from "./settings/Settings";

import { Solver } from './solver/Solver';

import Solution from "./UI/Solution";
import Countdown from './UI/Countdown';
import Board from './UI/Board';
import StartStop from './UI/StartStop';
const alarmURL = new URL('./UI/assets/alarm.wav', import.meta.url);

type BoggleProps = { variant?: BoggleVariant, controller?: Controller }
export function Boggle({ variant = "4x4", controller = getController(variant) }: BoggleProps) {
  const [endTime, setEndTime] = useState(new Date());
  const [solution, setSolution] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const handler = (event: GameEvent) => {
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
    const handler = (event: GameEvent) => {
      setEndTime(event.detail.endTime);

      const alarm = new Audio(alarmURL.toString());
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