import { useState } from "react";

interface CounterProps {
  initialCount?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

export function Counter({
  initialCount = 0,
  step = 1,
  onCountChange,
}: Readonly<CounterProps>) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const reset = () => {
    setCount(initialCount);
    onCountChange?.(initialCount);
  };

  return (
    <div data-testid="counter">
      <h2>Counter Component</h2>
      <p>
        Count: <span data-testid="count-display">{count}</span>
      </p>

      <div>
        <button onClick={decrement} data-testid="decrement-btn">
          Decrement
        </button>
        <button onClick={reset} data-testid="reset-btn">
          Reset
        </button>
        <button onClick={increment} data-testid="increment-btn">
          Increment
        </button>
      </div>

      {count > 10 && (
        <p data-testid="warning-message" style={{ color: "orange" }}>
          Count is getting high!
        </p>
      )}

      {count < 0 && (
        <p data-testid="negative-message" style={{ color: "red" }}>
          Count is negative!
        </p>
      )}
    </div>
  );
}
