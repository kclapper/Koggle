export type Listener = (event: CustomEvent) => void;

export type GameEvent = "gameStart" | "gameStop" | "gameOver";

export interface Controller {
  getSize(): number;
  getLetters(): string[];
  addEventListener(eventType: GameEvent, handler: Listener): void;
  removeEventListener(eventType: GameEvent, handler: Listener): void;
  startGame(): void;
  stopGame(): void;
}
