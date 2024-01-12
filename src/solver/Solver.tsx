import { Controller } from "../controllers/Controller";
import { getReachableWords, isWord } from "./Dictionary";

export interface Solver {
    constructor(game: Controller): Solver;
    isWord(word: string): boolean;
    possibleWords(): Iterable<string>;
}

export class Letter {
    public neighbors: Letter[] = [];
    public visited = false; 

    public readonly value: string;

    constructor(letter: string) {
        this.value = letter;
    }

    public addNeighbor(neighbor: Letter): void {
        this.neighbors.push(neighbor);
    }

    public getNeighbors(): Letter[] {
        return this.neighbors;
    }
}

export class Solver implements Solver {
    private words: Set<string>;

    constructor(game: Controller) {
        const size = game.getSize();

        const blocks = game.getBoard();
        const length = size * size;

        const letters = blocks.map((block) => new Letter(block));

        const rowMajor = (row: number, column: number) => (size * row) + column;
        const inBounds = (row: number, column: number) => {
            return 0 <= row && row < size && 0 <= column && column < size;
        };

        for (let i = 0; i < length; i++) {
            const column = i % size;
            const row = (i - column) / size;

            const letter = letters[i];

            if (inBounds(row - 1, column)) {
                letter.addNeighbor(letters[rowMajor(row - 1, column)]);  
            } 
            if (inBounds(row - 1, column - 1)) {
                letter.addNeighbor(letters[rowMajor(row - 1, column - 1)]);  
            } 
            if (inBounds(row - 1, column + 1)) {
                letter.addNeighbor(letters[rowMajor(row - 1, column + 1)]);  
            } 

            if (inBounds(row, column - 1)) {
                letter.addNeighbor(letters[rowMajor(row, column - 1)]);  
            } 
            if (inBounds(row, column + 1)) {
                letter.addNeighbor(letters[rowMajor(row, column + 1)]);  
            } 

            if (inBounds(row + 1, column)) {
                letter.addNeighbor(letters[rowMajor(row + 1, column)]);  
            } 
            if (inBounds(row + 1, column - 1)) {
                letter.addNeighbor(letters[rowMajor(row + 1, column - 1)]);  
            } 
            if (inBounds(row + 1, column + 1)) {
                letter.addNeighbor(letters[rowMajor(row + 1, column + 1)]);  
            } 
        }

        this.words = new Set<string>();
        for (const letter of letters) {
            const reachable = getReachableWords(letter);
            for (const word of reachable) {
                this.words.add(word);
            }
        }
    }

    public isWord = isWord;

    public possibleWords(): string[] {
        return Array.from(this.words).sort();    
    }
}