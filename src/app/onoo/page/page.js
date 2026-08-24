"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 5);
  }
  function handleMiles() {
    setCount(count - 5);
  }

  console.log(count);

  return (
    <div>
      <button onClick={handleMiles}>-</button>
      <p>{count}</p>
      <button onClick={handleAdd}>+</button>
    </div>
  );
}
