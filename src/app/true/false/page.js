"use client";

import React, { useState } from "react";

function LightSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => {
    setIsOn(!isOn);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{isOn ? "Гэрэл ассан" : "Гэрэл унтарсан"}</h1>

      <button onClick={toggleLight}>{isOn ? "true" : "false"}</button>
    </div>
  );
}

export default LightSwitch;
