# Koggle

A React Boggle game component. This package was created so I can
share Boggle across my React projects. A demonstration can be 
found at [my boggle site](https://boggle.kyleclapper.com).

## Usage

```javascript
import { Boggle } from "Koggle";

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