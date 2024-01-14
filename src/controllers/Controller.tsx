import { BoggleBoard } from "../util";

export type GameEventType = "gameStart" | "gameStop" | "gameOver";
export type GameEventDetail = { letters: BoggleBoard, endTime: Date };

export class GameEvent extends CustomEvent<GameEventDetail> {
  constructor(type: GameEventType, detail: GameEventDetail) {
    super(type, { detail: detail });
  }
}

export type Listener = (event: GameEvent) => void;

export interface Controller {
  getSize(): number;
  getBoard(): BoggleBoard;
  addEventListener(eventType: GameEventType, handler: Listener): void;
  removeEventListener(eventType: GameEventType, handler: Listener): void;
  startGame(): Promise<GameEvent>;
  stopGame(): void;
}
