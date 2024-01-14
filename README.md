# [Koggle](https://boggle.kyleclapper.com)

[![Test](https://github.com/kclapper/Koggle/actions/workflows/test.yml/badge.svg)](https://github.com/kclapper/Koggle/actions/workflows/test.yml)

A React Boggle game component. This package was created so I can
share Boggle across my React projects. A demonstration can be 
found at [my boggle site](https://boggle.kyleclapper.com).

## Features
- 4x4 and 5x5 Boggle gameplay
- Written in Typescript
- Uses React for the user interface
- Custom game logic
- Uses the Observer, Singleton, and Template Method design patterns
- Displays all words that can be found on the board at the end of the game
  - Uses a trie based on the official Scrabble dictionary to improve board solving performance 
  - One trie per letter of the English alphabet
- Uses GitHub Actions for CI testing and deployment to NPM

## Usage

```tsx
import { Boggle } from "koggle";

export default function MyApp() {
    return (
        <div>
            <h1>Look Ma! Boggle!</h1>
            <Boggle />
        </div>
    )
}
```

### Props

| Prop | Value | Description |
|------|-------|-------------|
| `variant` | "4x4" or "5x5" | Determines which Boggle game variant to use. Default is "4x4" |
| `controller` | A `Controller` object | Supercedes `variant`, specify a custom game controller | 