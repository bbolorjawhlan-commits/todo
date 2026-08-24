"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }
  console.log(count);

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleAdd}>❤️</button>
    </div>
  );
}
