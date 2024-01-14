import { AbstractBoggle } from "./AbstractBoggle";

export class BigBoggle extends AbstractBoggle {
  private static instance?: BigBoggle;

  public static getInstance() {
    if (BigBoggle.instance == undefined) {
      BigBoggle.instance = new BigBoggle();
    }
    return BigBoggle.instance;
  }

  public getSize() {
    return 5;
  }

  public generateLetters() {
    const length = this.getSize() * this.getSize();
    const letters = new Array<string>(length);

    letters[0] = this.randomPick("ASFRYI");
    letters[1] = this.randomPick("MOTTTE");
    letters[2] = this.randomPick("AEEAEE");
    letters[3] = this.randomPick("WRRVOG");
    letters[4] = this.randomPick("TIEPLC");
    letters[5] = this.randomPick("MEEEEA");
    letters[6] = this.randomPick("TOUTOO");
    letters[7] = this.randomPick("ENDANN");
    letters[8] = this.randomPick(["B", "Z", "K", "J", "Qu", "X"]);
    letters[9] = this.randomPick("DHLNOR");
    letters[10] = this.randomPick("LICTIE");
    letters[11] = this.randomPick("TCWNSC");
    letters[12] = this.randomPick("YPRSIF");
    letters[13] = this.randomPick("TIITIE");
    letters[14] = this.randomPick("HTNHOD");
    letters[15] = this.randomPick("ROLDHH");
    letters[16] = this.randomPick("EUMGAE");
    letters[17] = this.randomPick("AFSAAR");
    letters[18] = this.randomPick("PISTCE");
    letters[19] = this.randomPick("AFSARI");
    letters[20] = this.randomPick("DDLONR");
    letters[21] = this.randomPick("ESSSUN");
    letters[22] = this.randomPick("HIRYRP");
    letters[23] = this.randomPick("TOWOUN");
    letters[24] = this.randomPick("GNNAME");

    for (let i = 0; i < length; i++) {
      const j = Math.floor(Math.random() * length);

      const temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }

    return letters;
  }
}
