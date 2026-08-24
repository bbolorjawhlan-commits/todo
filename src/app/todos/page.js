"use client";

import { useState } from "react";
import { UserCard } from "../_components/UserCart";

export default function Home() {
  //   const [count, setCount] = useState(0);

  //   function handleAdd() {
  //     setCount(count + 1);
  //   }
  //   function handleMiles() {
  //     setCount(count - 1);
  //   }

  //   console.log(count);

  //   return (
  //     <div>
  //       <button onClick={handleMiles}>-</button>
  //       <p>{count}</p>
  //       <button onClick={handleAdd}>+</button>
  //     </div>
  //   );

  const students = [
    { name: "boloroo", age: 17 },
    { name: "oyuka", age: 30 },
    { name: "bold", age: 30 },
    { name: "bat", age: 30 },
  ];

  return students.map((student, index) => {
    return <UserCard key={index} student={student} />;
  });
}
