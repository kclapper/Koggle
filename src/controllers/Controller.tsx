import { BoggleBoard } from "../util";

export type Listener = (event: CustomEvent) => void;

export type GameEvent = "gameStart" | "gameStop" | "gameOver";

export interface Controller {
  getSize(): number;
  getBoard(): BoggleBoard;
  addEventListener(eventType: GameEvent, handler: Listener): void;
  removeEventListener(eventType: GameEvent, handler: Listener): void;
  startGame(): void;
  stopGame(): void;
}
