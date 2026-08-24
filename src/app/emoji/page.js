"use client";

import React, { useState } from "react";
import { UserCard } from "../_components/UserCart";
export default function Home() {
  const emojis = ["🖐", "✌️", "✊"];

  function computerChoose() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }

  function play(userChoice) {
    const computerChoice = computerChoose();
    console.log(`Таны сонголт: ${userChoice}`);
    console.log(`Компьютерийн сонголт: ${computerChoice}`);

    if (userChoice === computerChoice) {
      return "Тэнцлээ!";
    }

    if (
      (userChoice === "✊" && computerChoice === "✌️") ||
      (userChoice === "✌️" && computerChoice === "🖐") ||
      (userChoice === "🖐" && computerChoice === "✊")
    ) {
      return "Та хожлоо! 🎉";
    } else {
      return "Компьютер хожлоо! 🤖";
    }
  }

  console.log(play("✊"));
}
