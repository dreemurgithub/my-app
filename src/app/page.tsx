'use client'
import { useState } from "react";

export default function Home() {
  const sumOne = (n: number) => {
    if (n < 0) return 0
    // brute force
    let i = 0;
    let sum = 0;
    for (i; i <= n; i++) sum += i;
    return sum;
  };

  const sumTwo = (n: number) => {
    if (n < 0) return 0
    // brute force, from higher to less
    let i = n;
    let sum = 0
    while (i > 0) {
      sum += i
      i--
    }
    return sum
  };

  const sumMath = (n: number) => {
    if (n < 0) return 0
    // just basic math
    // 2 * Sum == (1 + n) + (2 + n-1) +.... (n + 1) // iterate from 1 to n
    return (n * (n + 1)) / 2; // n is the total pair, n+1 is the value of each pair
  };
  const [n, setN] = useState(0)
  return <div>
    <input type="number" min={0} value={n} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      setN(Number(e.target.value))
    }} />
    <p>sum one {sumOne(n)}</p>
    <p>sum two {sumTwo(n)}</p>
    <p>sum math {sumMath(n)}</p>
  </div>;
}
