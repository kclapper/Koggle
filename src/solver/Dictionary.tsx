import wordList from './words/words.json';
import { Letter } from './Solver';

export class Node {
    letter: string;
    isWord: boolean;
    children: Node[];

    constructor(letter: string, isWord: boolean) {
        this.letter = letter;
        this.isWord = isWord;
        this.children = [];
    }

    public addChild(letter: string, isWord: boolean): Node {
        const next = new Node(letter, isWord);
        this.children.push(next);
        return next;
    }
}

function addWordToNodes(word: string, nodes: Node[]) {
    const letter = word[0];
    const rest = word.substring(1);

    let nextNode;
    for (const node of nodes) {
        if (node.letter === letter) {
            nextNode = node;
        }
    }

    if (nextNode === undefined) {
        nextNode = new Node(letter, false);
        nodes.push(nextNode);
    }

    if (rest.length === 0) {
        nextNode.isWord = true;
        return;
    }

    addWordToNodes(rest, nextNode.children);
}

const words = wordList.map((word) => word.toUpperCase());

const dictionary: Node[] = [];

for (const word of words) {
    addWordToNodes(word, dictionary);
}

export function isWord(word: string): boolean {
    return isWordInNodes(word, dictionary);
}

function isWordInNodes(word: string, nodes: Node[]): boolean {
    const letter = word[0];
    const rest = word.substring(1);

    let nextNode;
    for (const node of nodes) {
        if (node.letter = letter) {
            nextNode = node;
        }
    }

    if (nextNode === undefined) {
        return false;
    }

    if (rest.length === 0) {
        return true;
    }

    return isWordInNodes(rest, nextNode.children);
}

export function getReachableWords(block: Letter) {
    const prefix = ''; 
    const words = new Set<string>();

    for (const dictionaryNode of dictionary) {
        addReachableWords(prefix, block, dictionaryNode, words);
    }

    return words;
}

function addReachableWords(prefix: string, block: Letter, dictionaryNode: Node, words: Set<string>): void {
    if (block.visited || block.value !== dictionaryNode.letter) {
        return;
    }

    block.visited = true;

    const letter = dictionaryNode.letter;
    const word = prefix + letter;

    for (const searchNext of block.neighbors) {
        for (const dictionaryNext of dictionaryNode.children) {
            addReachableWords(word, searchNext, dictionaryNext, words);
        }
    }

    block.visited = false;

    if (dictionaryNode.isWord) {
        words.add(word);
    }
}