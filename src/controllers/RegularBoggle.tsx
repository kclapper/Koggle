import { AbstractBoggle } from "./AbstractBoggle";

export class RegularBoggle extends AbstractBoggle {
  private static instance?: RegularBoggle;

  public static getInstance() {
    if (RegularBoggle.instance == undefined) {
      RegularBoggle.instance = new RegularBoggle();
    }
    return RegularBoggle.instance;
  }

  public getSize() {
    return 4;
  };

  public generateLetters() {
    const length = this.getSize() * this.getSize();
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
}
