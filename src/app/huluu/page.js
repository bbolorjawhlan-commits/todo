"use client"; // Required for client-side interactivity in Next.js App Router

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const emojis = ["🖐", "✌️", "✊"];

  const play = (userChoice) => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const computerChoice = emojis[randomIndex];

    let message = `You: ${userChoice} vs Computer: ${computerChoice} | `;

    if (userChoice === computerChoice) {
      message += "It's a tie! 🤝";
    } else if (
      (userChoice === "✊" && computerChoice === "✌️") ||
      (userChoice === "✌️" && computerChoice === "🖐") ||
      (userChoice === "🖐" && computerChoice === "✊")
    ) {
      message += "You win! 🎉";
    } else {
      message += "Computer wins! 🤖";
    }

    setResult(message);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Rock, Paper, Scissors</h1>
      <p>Make your move:</p>

      <div>
        <button onClick={() => play("🖐")} style={buttonStyle}>
          🖐
        </button>
        <button onClick={() => play("✌️")} style={buttonStyle}>
          ✌️
        </button>
        <button onClick={() => play("✊")} style={buttonStyle}>
          ✊
        </button>
      </div>

      {result && (
        <div
          style={{ marginTop: "30px", fontSize: "20px", fontWeight: "bold" }}
        >
          {result}
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  fontSize: "40px",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
};
