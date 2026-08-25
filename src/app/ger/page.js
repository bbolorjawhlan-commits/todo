"use client";

import React, { useState } from "react";

export default function Home() {
  const [childrenData, setChildrenData] = useState({
    son: { name: "Хүү", tasksDone: 0, totalTasks: 3, stars: 0, balance: 0 },
    daughter: {
      name: "Охин",
      tasksDone: 0,
      totalTasks: 2,
      stars: 0,
      balance: 0,
    },
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      assignee: "Дүү",
      title: "toos soruulah",
      stars: 1,
      completed: false,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedChild, setSelectedChild] = useState("son");

  const STAR_VALUE = 500;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assigneeName = selectedChild === "son" ? "Хүү" : "Охин";

    const newTask = {
      id: Date.now(),
      assignee: assigneeName,
      title: newTaskTitle,
      stars: 1,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setChildrenData((prev) => ({
      ...prev,
      [selectedChild]: {
        ...prev[selectedChild],
        totalTasks: prev[selectedChild].totalTasks + 1,
      },
    }));

    setNewTaskTitle("");
  };

  const handleCompleteTask = (id, assignee) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    const key = assignee === "Хүү" ? "son" : "daughter";

    setChildrenData((prev) => {
      const updatedStars = prev[key].stars + 1;
      const updatedBalance = prev[key].balance + STAR_VALUE;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          tasksDone: prev[key].tasksDone + 1,
          stars: updatedStars,
          balance: updatedBalance,
        },
      };
    });
  };

  const handleDeleteTask = (id, assignee) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    const key = assignee === "Хүү" ? "son" : "daughter";
    if (childrenData[key] && childrenData[key].totalTasks > 0) {
      setChildrenData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          totalTasks: Math.max(0, prev[key].totalTasks - 1),
        },
      }));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            ⭐ Гэр Бүлийн Автомат Ажил Хуваарилалт ⭐
          </h1>
          <button className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-sm text-sm">
            🔄 Ажлуудыг Автомат Солих
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-6 py-3.5 rounded-2xl flex items-center gap-2 font-semibold shadow-sm">
          🏆 Энэ сарын хуримтлал (1 Од = {STAR_VALUE} ₮)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(childrenData).map(([key, child]) => (
            <div
              key={key}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center space-y-3"
            >
              <h2 className="text-xl font-bold text-slate-900">{child.name}</h2>
              <p className="text-sm text-slate-500 font-medium">
                📅 Өнөөдрийн явц:{" "}
                <span className="text-slate-800 font-bold">
                  {child.tasksDone} / {child.totalTasks}
                </span>
              </p>
              <div className="text-amber-500 font-bold tracking-wide">
                {"⭐".repeat(Math.min(child.stars, 5))} {child.stars} одон
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-5 py-2 rounded-xl font-bold text-lg border border-emerald-100 flex items-center gap-1.5">
                💰 {child.balance} ₮
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAddTask}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 flex gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none border-r border-slate-200 pr-2 cursor-pointer"
            >
              <option value="son">Хүү</option>
              <option value="daughter">Охин</option>
            </select>
            <input
              type="text"
              placeholder="Шинэ ажлын нэр оруулах..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="bg-transparent flex-1 outline-none text-slate-800 placeholder-slate-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-sm whitespace-nowrap text-sm"
          >
            + Ажил Нэмэх
          </button>
        </form>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            📅 Өнөөдрийн Хийх Ажлууд
          </h3>

          {tasks.length === 0 ? (
            <p className="text-slate-400 text-center py-6 text-sm">
              Өнөөдөртөө хийх ажил одоогоор байхгүй байна. 🎉
            </p>
          ) : (
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-sm">
                      [{task.assignee}]
                    </span>
                    <span className="text-slate-700 font-medium text-sm">
                      {task.title}
                    </span>
                    <span className="text-amber-500 text-xs font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                      ({task.stars} ⭐)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCompleteTask(task.id, task.assignee)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
                    >
                      Хийх
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id, task.assignee)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Устгах"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
