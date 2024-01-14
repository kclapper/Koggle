import { Controller, GameEvent, GameEventType, Listener } from "./Controller";

type Miliseconds = number;

export abstract class AbstractBoggle implements Controller {
  protected letters: string[];
  protected endTime: Date;
  protected listeners: Record<GameEventType, Set<Listener>>;
  protected timeout?: ReturnType<typeof setTimeout>;
  protected duration: Miliseconds;

  protected constructor() {
    this.letters = this.generateLetters();
    this.endTime = new Date();
    this.listeners = {
      gameStart: new Set(),
      gameStop: new Set(),
      gameOver: new Set()
    };
    this.duration = 3 * 60 * 1000;
  }

  public abstract getSize(): number;

  protected abstract generateLetters(): string[];

  protected randomPick(array: string | string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  protected randomLetter() {
    const charCode = Math.floor(Math.random() * 26) + 65
    return String.fromCharCode(charCode);
  }

  public getBoard() {
    return this.letters;
  }

  public startGame() {
    this.letters = this.generateLetters();
    this.endTime = new Date(Date.now() + this.duration);

    const eventDetail = {
      letters: this.letters,
      endTime: this.endTime
    }
    const startEvent = new GameEvent('gameStart', eventDetail);
    const overEvent = new GameEvent('gameOver', eventDetail);

    this.updateListeners('gameStart', startEvent);

    return new Promise<GameEvent>((resolve, reject) => {
      const stopHandler = (stopEvent: GameEvent) => {
        this.removeEventListener("gameStop", stopHandler);
        reject(stopEvent);
      };
      this.addEventListener("gameStop", stopHandler);

      this.timeout = setTimeout(() => {
        this.removeEventListener("gameStop", stopHandler);
        this.updateListeners('gameOver', overEvent);
        resolve(overEvent);
      }, this.duration);
    });
  }

  public stopGame() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.endTime = new Date();

    const event = new GameEvent('gameStop', {
      letters: this.letters,
      endTime: this.endTime
    })

    this.updateListeners('gameStop', event);
  }

  private updateListeners(eventType: GameEventType, event: GameEvent) {
    for (const listener of this.listeners[eventType]) {
      listener(event);
    }
  }

  public addEventListener(eventType: GameEventType, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].add(listener);
  }

  public removeEventListener(eventType: GameEventType, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].delete(listener);
  }
}
