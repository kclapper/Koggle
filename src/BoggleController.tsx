import { Controller, GameEvent, Listener } from "./Controller";

export class BoggleController implements Controller {
  private static instance?: BoggleController;

  public static getInstance() {
    if (BoggleController.instance == undefined) {
      BoggleController.instance = new BoggleController();
    }
    return BoggleController.instance;
  }

  private letters: string[];
  private endTime: Date;
  private listeners: Record<GameEvent, Set<Listener>>;

  private constructor() {
    this.letters = this.generateLetters();
    this.endTime = new Date();
    this.listeners = {
      gameOver: new Set(),
      gameStart: new Set()
    };
  }

  public generateLetters() {
    const length = 16;
    const letters = new Array(length);

    letters[0] = this.randomPick("EAEANG");
    letters[1] = this.randomPick("UOIMTC");
    letters[2] = this.randomPick("REYVLD");
    letters[3] = this.randomPick("WENHEG");
    letters[4] = this.randomPick("KPSFFA");
    letters[5] = this.randomPick(["Qu","U","I","H","M","N"]);
    letters[6] = this.randomPick("IESNEU");
    letters[7] = this.randomPick("LDIREX");
    letters[8] = this.randomPick("OOBJAB");
    letters[9] = this.randomPick("PACHOS");
    letters[10] = this.randomPick("RLNZNH");
    letters[11] = this.randomPick("TSYTDI");
    letters[12] = this.randomPick("STISOE");
    letters[13] = this.randomPick("WRVTHE");
    letters[14] = this.randomPick("TOWTOA");
    letters[15] = this.randomPick("REYLTT");

    for (let i = 0; i < length; i++) {
      let j = Math.floor(Math.random() * length);

      let temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }

    return letters;
  }

  randomPick(array: string | string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomLetter() {
    let charCode = Math.floor(Math.random() * 26) + 65
    return String.fromCharCode(charCode);
  }

  getLetters() {
    return this.letters;
  }

  startNewGame() {
    this.letters = this.generateLetters();
    this.endTime = new Date(Date.now() + (3 * 60 * 1000));

    const event = new CustomEvent('gameStart', { detail: {
      letters: this.letters,
      endTime: this.endTime
    } })

    this.updateListeners('gameStart', event);
  }

  endGame() {
    this.endTime = new Date();

    const event = new CustomEvent('gameOver', { detail: {
      letters: this.letters,
      endTime: this.endTime
    } })

    this.updateListeners('gameOver', event);
  }

  updateListeners(eventType: GameEvent, event: CustomEvent) {
    for (const listener of this.listeners[eventType]) {
      listener(event);
    }
  }

  addEventListener(eventType: GameEvent, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].add(listener);
  }

  removeEventListener(eventType: GameEvent, listener: Listener) {
    if (this.listeners[eventType] == undefined) {
      return;
    }
    this.listeners[eventType].delete(listener);
  }
}
