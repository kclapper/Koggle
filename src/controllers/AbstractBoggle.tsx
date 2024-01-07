import { Controller, GameEvent, Listener } from "./Controller";

export abstract class AbstractBoggle implements Controller {
  protected letters: string[];
  protected endTime: Date;
  protected listeners: Record<GameEvent, Set<Listener>>;
  protected timeout?: ReturnType<typeof setTimeout>;

  protected constructor() {
    this.letters = this.generateLetters();
    this.endTime = new Date();
    this.listeners = {
      gameStart: new Set(),
      gameStop: new Set(),
      gameOver: new Set()
    };
  }

  public abstract getSize(): number;

  public abstract generateLetters(): string[];

  protected randomPick(array: string | string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  protected randomLetter() {
    let charCode = Math.floor(Math.random() * 26) + 65
    return String.fromCharCode(charCode);
  }

  public getLetters() {
    return this.letters;
  }

  public startGame() {
    const duration = 3 * 60 * 1000;
    this.letters = this.generateLetters();
    this.endTime = new Date(Date.now() + duration);

    this.timeout = setTimeout(() => {
      const event = new CustomEvent('gameOver', {
        detail: {
          letters: this.letters,
          endTime: new Date()
        }
      });
      this.updateListeners('gameOver', event);
    }, duration);

    const event = new CustomEvent('gameStart', { detail: {
      letters: this.letters,
      endTime: this.endTime
    } })
    this.updateListeners('gameStart', event);
  }

  public stopGame() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.endTime = new Date();

    const event = new CustomEvent('gameStop', { detail: {
      letters: this.letters,
      endTime: this.endTime
    } })

    this.updateListeners('gameStop', event);
  }

  private updateListeners(eventType: GameEvent, event: CustomEvent) {
    for (const listener of this.listeners[eventType]) {
      listener(event);
    }
  }

  public addEventListener(eventType: GameEvent, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].add(listener);
  }

  public removeEventListener(eventType: GameEvent, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].delete(listener);
  }
}
