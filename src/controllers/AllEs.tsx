import { AbstractBoggle } from "./AbstractBoggle";

export class AllEs extends AbstractBoggle {
  private static instance?: AllEs;

  public static getInstance() {
    if (AllEs.instance == undefined) {
      AllEs.instance = new AllEs();
    }
    return AllEs.instance;
  }

  public getSize() {
    return 4;
  }

  public generateLetters() {
    const length = this.getSize() * this.getSize();
    const letters = new Array<string>(length);

    for (let i = 0; i < length; i++) {
      letters[i] = "E";
    }

    return letters;
  }
}
