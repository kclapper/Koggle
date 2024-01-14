import {describe, expect, test} from '@jest/globals';
import { AbstractBoggle } from "../src/controllers/AbstractBoggle";
import { RegularBoggle } from "../src/controllers/RegularBoggle";
import { BigBoggle } from "../src/controllers/BigBoggle";
import { GameEvent } from '../src/controllers/Controller';

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

    public handlerCount(): number {
        const start = this.listeners.gameStart.size;
        const stop = this.listeners.gameStop.size;
        const over = this.listeners.gameOver.size;
        return start + stop + over;
    }

    public setDuration(duration: number) {
        this.duration = duration;
    }
}

describe('Common Boggle Tests', () => {

    test('getSize', () => {
        const boggle = new TestBoggle();
        expect(boggle.getSize()).toBe(testBoardSize);
    });
    test('getBoard', () => {
        const boggle = new TestBoggle();
        expect(boggle.getBoard()).toEqual(testBoardLetters);
    });

    test('Add/remove handlers', () => {
        const boggle = new TestBoggle();
        const handler = () => {};

        boggle.addEventListener("gameStart", handler);
        expect(boggle.handlerCount()).toBe(1);

        boggle.addEventListener("gameStop", handler);
        boggle.addEventListener("gameOver", handler);
        expect(boggle.handlerCount()).toBe(3);

        boggle.removeEventListener("gameStart", handler);
        expect(boggle.handlerCount()).toBe(2);

        boggle.removeEventListener("gameStop", handler);
        boggle.removeEventListener("gameOver", handler);
        expect(boggle.handlerCount()).toBe(0);
    });

    test('Start game event emitted', () => {
        const boggle = new TestBoggle();

        let startEventLetters: string[];
        let startEventEndTime: Date;

        const handler = (event: GameEvent) => {
            startEventEndTime = event.detail.endTime;
            startEventLetters = event.detail.letters;
        };
        boggle.addEventListener("gameStart", handler);

        const endTime = new Date();
        const endGamePromise = boggle.startGame();

        endGamePromise.then(() => {
            expect(startEventLetters!).toEqual(testBoardLetters);
            expect(startEventEndTime!).toEqual(endTime);
        });
    });

    test('Game over event emitted', () => {
        const boggle = new TestBoggle();

        let endEventLetters: string[];
        let endEventEndTime: Date;

        boggle.addEventListener("gameOver", (event) => {
            endEventEndTime = event.detail.endTime;
            endEventLetters = event.detail.letters;
        });

        const endTime = new Date();
        const endGamePromise = boggle.startGame();

        endGamePromise.then((event) => {
            expect(event.type).toEqual("gameOver");
            expect(event.detail.letters).toEqual(testBoardLetters);
            expect(event.detail.endTime).toEqual(endTime);

            expect(endEventLetters!).toEqual(testBoardLetters);
            expect(endEventEndTime!).toEqual(endTime);
        });
    });

    test('Stop game event emitted', () => {
        const boggle = new TestBoggle();
        boggle.setDuration(10000);

        let stopEventLetters: string[];
        let stopEventEndTime: Date;

        boggle.addEventListener("gameStop", (event) => {
            stopEventEndTime = event.detail.endTime;
            stopEventLetters = event.detail.letters;
        });

        const endGamePromise = boggle.startGame();

        const endTime = new Date();
        boggle.stopGame();

        endGamePromise.catch((event) => {
            expect(event.type).toEqual("gameStop");
            expect(event.detail.letters).toEqual(testBoardLetters);
            expect(event.detail.endTime).toEqual(endTime);

            expect(stopEventLetters!).toEqual(testBoardLetters);
            expect(stopEventEndTime!).toEqual(endTime);
        });
    });

    test('Default 3 minute duration', () => {
        class TestBoggle extends AbstractBoggle {
            public constructor() {
                super();
            }
            public getSize() { return 0 };
            protected generateLetters(): string[] {
                return [];
            }
            public getDuration() {
                return this.duration;
            }
        }
        
        const boggle = new TestBoggle();
        expect(boggle.getDuration()).toBe(3 * 60 * 1000);
    });
});

class Test4by4 extends RegularBoggle {
    public constructor() {
        super();
    }
    public getDuration() {
        return this.duration;
    }
}

describe('Test 4x4 Boggle', () => {
    test('Is singleton', () => {
        const firstBoggle = RegularBoggle.getInstance();
        const secondBoggle = RegularBoggle.getInstance();

        expect(secondBoggle).toBe(firstBoggle);
    });

    test('3 minute duration', () => {
        const boggle = new Test4by4();
        expect(boggle.getDuration()).toBe(3 * 60 * 1000);
    }); 

    test('Is 4x4 board size', () => {
        const boggle = new Test4by4();
        expect(boggle.getSize()).toBe(4);
    })

    test('Board has 16 upper case letters', () => {
        const boggle = new Test4by4();
        const board = boggle.getBoard();

        expect(board.length).toBe(16);

        for (const letter of board) {
            if (letter === "Qu") {
                continue;
            }

            expect(letter === letter.toUpperCase()).toBe(true);
        }
    });
});

class Test5by5 extends BigBoggle {
    public constructor() {
        super();
    }
    public getDuration() {
        return this.duration;
    }
}

describe('Test 5x5 Boggle', () => {
    test('Is singleton', () => {
        const firstBoggle = BigBoggle.getInstance();
        const secondBoggle = BigBoggle.getInstance();

        expect(secondBoggle).toBe(firstBoggle);
    });

    test('3 minute duration', () => {
        const boggle = new Test5by5();
        expect(boggle.getDuration()).toBe(3 * 60 * 1000);
    }); 

    test('Is 5x5 board size', () => {
        const boggle = new Test5by5();
        expect(boggle.getSize()).toBe(5);
    })

    test('Board has 25 upper case letters', () => {
        const boggle = new Test5by5();
        const board = boggle.getBoard();

        expect(board.length).toBe(25);

        for (const letter of board) {
            if (letter === "Qu") {
                continue;
            }

            expect(letter === letter.toUpperCase()).toBe(true);
        }
    });
});