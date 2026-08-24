"use client";

import React, { useState } from "react";
export default function Home() {
  const [isOn, setIsOn] = useState(true);

  const toggleEmoji = () => {
    setIsOn(!isOn);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <button onClick={toggleEmoji}>{isOn ? "😐" : "☺️"}</button>
    </div>
  );
}
