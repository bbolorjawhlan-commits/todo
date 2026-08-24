"use client";

import React, { useState, useEffect } from "react";

export default function FamilyChoreCollector() {
  const [members, setMembers] = useState([
    { id: 1, name: "Аав", stars: 0 },
    { id: 2, name: "Ээж", stars: 0 },
    { id: 3, name: "Хүү", stars: 0 },
    { id: 4, name: "Дүү", stars: 0 },
  ]);

  const [chores, setChores] = useState([
    { id: 1, name: "Аяга таваг угаах", reward: 1 },
    { id: 2, name: "Гэр цэвэрлэх / тоос соруулах", reward: 1 },
    { id: 3, name: "Хог хаях", reward: 1 },
    { id: 4, name: "Хувцас угаалгад хийх", reward: 1 },
    { id: 5, name: "Хоол хийхэд туслах", reward: 1 },
    { id: 6, name: "Хичээлээ хийх / Ном унших", reward: 1 },
    { id: 7, name: "Өрөөгөө цэгцлэх", reward: 1 },
    { id: 8, name: "Хувцсаа хураах", reward: 1 },
    { id: 9, name: "Угаалгын өрөө цэвэрлэх", reward: 1 },
    { id: 10, name: "Гутал арчиж цэгцлэх", reward: 1 },
    { id: 11, name: "Цэцэг услах", reward: 1 },
    { id: 12, name: "Тоос арчих", reward: 1 },
  ]);

  const [assignments, setAssignments] = useState([]);
  const [history, setHistory] = useState([]);

  const STAR_VALUE = 1000;

  // Автомат ажил хуваарилах функц
  const autoGenerateChores = (currentMembers) => {
    if (currentMembers.length === 0 || chores.length < 3) return [];

    let newAssignments = [];
    currentMembers.forEach((member) => {
      const shuffledChores = [...chores].sort(() => Math.random() - 0.5);
      const selectedChores = shuffledChores.slice(0, 3);

      selectedChores.forEach((chore, index) => {
        newAssignments.push({
          uniqueId: `${member.id}-${index}-${Date.now()}`,
          memberId: member.id,
          memberName: member.name,
          choreName: chore.name,
          reward: chore.reward,
          completed: false,
        });
      });
    });

    return newAssignments;
  };

  useEffect(() => {
    const savedMembers = localStorage.getItem("family_members");
    const savedHistory = localStorage.getItem("chore_history");

    let activeMembers = savedMembers ? JSON.parse(savedMembers) : members;
    let activeHistory = savedHistory ? JSON.parse(savedHistory) : [];

    if (savedMembers) setMembers(activeMembers);
    if (savedHistory) setHistory(activeHistory);

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const currentMonthStr = `${now.getFullYear()}-${now.getMonth() + 1}`;

    const lastDate = localStorage.getItem("last_assignment_date");
    const lastMonth = localStorage.getItem("last_payout_month");
    const savedAssignments = localStorage.getItem("current_assignments");

    let needNewAssignments = false;

    if (lastMonth && lastMonth !== currentMonthStr) {
      const prevDate = new Date();
      prevDate.setMonth(prevDate.getMonth() - 1);
      const prevMonthName = prevDate.toLocaleString("mn-MN", { month: "long" });

      let summaryLog = `--- 💰 ${prevMonthName} сарын автомат мөнгөн тооцоо хаагдлаа ---`;

      activeMembers = activeMembers.map((m) => {
        const payoutAmount = m.stars * STAR_VALUE;
        summaryLog += `\n💵 ${m.name}: ${m.stars} одон = ${payoutAmount.toLocaleString()} ₮`;
        return { ...m, stars: 0 };
      });

      setMembers(activeMembers);
      localStorage.setItem("family_members", JSON.stringify(activeMembers));

      activeHistory = [summaryLog, ...activeHistory];
      setHistory(activeHistory);
      localStorage.setItem("chore_history", JSON.stringify(activeHistory));

      needNewAssignments = true;
    }
    localStorage.setItem("last_payout_month", currentMonthStr);

    if (lastDate !== todayStr || needNewAssignments) {
      const freshAssignments = autoGenerateChores(activeMembers);
      setAssignments(freshAssignments);
      localStorage.setItem("last_assignment_date", todayStr);
      localStorage.setItem(
        "current_assignments",
        JSON.stringify(freshAssignments),
      );
    } else if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  const completeChore = (uniqueId) => {
    const targetIndex = assignments.findIndex(
      (item) => item.uniqueId === uniqueId,
    );
    if (targetIndex === -1 || assignments[targetIndex].completed) return;

    const updatedAssignments = [...assignments];
    updatedAssignments[targetIndex].completed = true;
    setAssignments(updatedAssignments);
    localStorage.setItem(
      "current_assignments",
      JSON.stringify(updatedAssignments),
    );

    const { choreName, reward, memberName, memberId } =
      updatedAssignments[targetIndex];

    const updatedMembers = members.map((m) =>
      m.id === memberId ? { ...m, stars: m.stars + reward } : m,
    );
    setMembers(updatedMembers);
    localStorage.setItem("family_members", JSON.stringify(updatedMembers));

    const logMessage = `[${new Date().toLocaleTimeString()}] ${memberName} "${choreName}" ажлыг хийж, +${reward} одон цуглууллаа! (+${reward * STAR_VALUE} ₮) ⭐`;
    const updatedHistory = [logMessage, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("chore_history", JSON.stringify(updatedHistory));
  };

  const getMemberProgress = (memberId) => {
    const memberTasks = assignments.filter(
      (item) => item.memberId === memberId,
    );
    const completedTasks = memberTasks.filter((item) => item.completed).length;
    return `${completedTasks} / ${memberTasks.length}`;
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        ⭐ Гэр Бүлийн Автомат Ажил Хуваарилалт ⭐
      </h1>

      <div
        style={{
          background: "#f0f4f8",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          🏆 Энэ сарын хуримтлал (1 Одон = {STAR_VALUE.toLocaleString()} ₮)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px",
          }}
        >
          {members.map((m) => (
            <div
              key={m.id}
              style={{
                background: "#fff",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <strong style={{ fontSize: "16px" }}>{m.name}</strong>
              <div style={{ fontSize: "13px", color: "#555", margin: "3px 0" }}>
                📅 Өнөөдрийн явц: <strong>{getMemberProgress(m.id)}</strong>
              </div>
              <div
                style={{ fontSize: "18px", color: "#ffa500", margin: "5px 0" }}
              >
                {"⭐".repeat(Math.max(0, Math.min(m.stars, 5)))} {m.stars} одон
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                💰 {(m.stars * STAR_VALUE).toLocaleString()} ₮
              </div>
            </div>
          ))}
        </div>
      </div>

      {assignments.length > 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>📅 Өнөөдрийн Хийх Ажлууд</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {assignments.map((item) => (
              <li
                key={item.uniqueId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "#888" : "#000",
                  }}
                >
                  <strong style={{ color: "#0070f3" }}>
                    [{item.memberName}]
                  </strong>
                  : {item.choreName}{" "}
                  <span style={{ color: "#ffa500" }}>({item.reward} ⭐)</span>
                </span>
                <button
                  onClick={() => completeChore(item.uniqueId)}
                  disabled={item.completed}
                  style={{
                    padding: "5px 10px",
                    background: item.completed ? "#d9d9d9" : "#52c41a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: item.completed ? "not-allowed" : "pointer",
                  }}
                >
                  {item.completed ? "Хийсэн ✓" : "Одон авах"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Түүх */}
      {history.length > 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            📜 Сүүлийн үйлдэлүүд болон Сарын хаалт
          </h3>
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              fontSize: "14px",
              color: "#555",
              whiteSpace: "pre-line",
            }}
          >
            {history.map((log, i) => (
              <div
                key={i}
                style={{ padding: "5px 0", borderBottom: "1px dashed #eee" }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
