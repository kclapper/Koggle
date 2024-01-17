import {describe, expect, test} from '@jest/globals';
import { AbstractBoggle } from "../src/controllers/AbstractBoggle";
import { Solver } from "../src/solver/Solver";

const testBoardSize = 2;
const testBoardLetters = ["C", "A", "T", "S"];
const testBoardDuration = 0;

class TestBoggle extends AbstractBoggle {
    public constructor() {
        super();
        this.duration = testBoardDuration;
    }

    public getSize(): number {
        return testBoardSize;
    }

    protected generateLetters(): string[] {
        return testBoardLetters;    
    }

    public setLetters(letters: string[]) {
      if (letters.length === this.getSize() * this.getSize()) {
        this.letters = letters;
      } else {
        throw new Error("Wrong number of letters given");
      }
    }
}

describe('Test Solver', () => {

  test('Can recognize English words', () => {
    const boggle = new TestBoggle();
    const solver = new Solver(boggle);
    
    expect(solver.isWord("Ham")).toBe(true);
    expect(solver.isWord("ham")).toBe(true);
    expect(solver.isWord("HAM")).toBe(true);
    expect(solver.isWord("tOaSt")).toBe(true);

    expect(solver.isWord("torbuldyne")).toBe(false);
  });

  test('Can solve 2 by 2 game board', () => {
    const boggle = new TestBoggle();
    const solver = new Solver(boggle);
    
    const solution = solver.possibleWords();

    expect(solution.length).toBe(9);

    expect(solution.includes("ACT")).toBe(true);
    expect(solution.includes("ACTS")).toBe(true);
    expect(solution.includes("CAST")).toBe(true);
    expect(solution.includes("CAT")).toBe(true);
    expect(solution.includes("CATS")).toBe(true);
    expect(solution.includes("SAC")).toBe(true);
    expect(solution.includes("SAT")).toBe(true);
    expect(solution.includes("SCAT")).toBe(true);
    expect(solution.includes("TAS")).toBe(true);
  });

  test('Does not find words shorter than 3 letters', () => {
    const boggle = new TestBoggle();
    const solver = new Solver(boggle);
    
    const solution = solver.possibleWords();
    expect("AT" in solution).toBe(false);
  });

  test('Does not reuse letters', () => {
    const boggle = new TestBoggle();
    const solver = new Solver(boggle);
    
    const solution = solver.possibleWords();
    expect(solution.includes("CASTS")).toBe(false);
  });

  test('Handlers "Qu" as two separate letters', () => {
    const boggle = new TestBoggle();
    boggle.setLetters(["Qu", "I", "T", "S"]); 

    const solver = new Solver(boggle);
    const solution = solver.possibleWords();

    expect(solution.length).toBe(5);

    expect(solution).toContain("ITS");
    expect(solution).toContain("QUIT");
    expect(solution).toContain("QUITS");
    expect(solution).toContain("SIT");
    expect(solution).toContain("TIS");
  });
});