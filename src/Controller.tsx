export type Listener = (event: CustomEvent) => void;

export type GameEvent = "gameOver" | "gameStart";

export interface Controller {
  getLetters(): string[];
  addEventListener(eventType: GameEvent, handler: Listener): void;
  removeEventListener(eventType: GameEvent, handler: Listener): void;
  startNewGame(): void;
  endGame(): void;
}
