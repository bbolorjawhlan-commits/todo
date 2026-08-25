"use client";
import { useState } from "react";

export default function HomeChoreStarsPage() {
  const [tasks, setTasks] = useState([
    {
      id: 2,
      text: " Шал арчиж, тоос соруулах",
      stars: 2,
      done: false,
      member: "Хүү",
    },
    { id: 3, text: " Хог асгах", stars: 1, done: true, member: "Охин" },
  ]);

  const [newText, setNewText] = useState("");
  const [newMember, setNewMember] = useState("Аав");
  const [newStars, setNewStars] = useState(1);

  const addTask = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newText,
      stars: Number(newStars),
      done: false,
      member: newMember,
    };

    setTasks([...tasks, newTask]);
    setNewText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const members = ["Хүү", "Охин"];
  const leaderboard = members
    .map((member) => {
      const totalStars = tasks
        .filter((t) => t.member === member && t.done)
        .reduce((sum, t) => sum + t.stars, 0);
      return { name: member, stars: totalStars };
    })
    .sort((a, b) => b.stars - a.stars);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 flex items-center justify-center gap-2">
            ✨ Одон Цуглуулах Самбар
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Ажлаа амжилттай дуусгаад гэр бүлээ оддоор чимээрэй!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form
              onSubmit={addTask}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3"
            >
              <div className="text-sm font-bold text-slate-700">
                ➕ Шинэ ажил одоор үнэлж нэмэх
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Хийх ажил..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="sm:col-span-3 w-full p-2.5 border rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <select
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  className="p-2.5 border rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {members.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={newStars}
                  onChange={(e) => setNewStars(e.target.value)}
                  className="p-2.5 border rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="1">⭐ 1 Од (Хялбар)</option>
                  <option value="2">⭐⭐ 2 Од (Дунд)</option>
                  <option value="3">⭐⭐⭐ 3 Од (Хүнд)</option>
                </select>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm p-2.5 rounded-xl transition-all"
                >
                  Ажил нэмэх
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="text-base font-bold text-slate-800 mb-2">
                📋 Хийх ажлууд
              </div>
              {tasks.length === 0 ? (
                <p className="text-center text-slate-400 py-4 text-sm">
                  Одоогоор ажил байхгүй байна.
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all ${
                      task.done
                        ? "bg-slate-50 border-slate-200 opacity-50"
                        : "bg-white border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        readOnly
                        className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span
                        className={`text-sm font-medium text-slate-800 ${task.done ? "line-through text-slate-400" : ""}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">
                        {task.member}
                      </span>
                      <span className="text-xs font-black text-amber-500">
                        {"⭐".repeat(task.stars)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              🏆 Шилдэг гишүүд
            </h2>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 flex items-center justify-center font-bold text-sm rounded-full ${
                        index === 0
                          ? "bg-amber-400 text-white"
                          : index === 1
                            ? "bg-slate-300 text-slate-700"
                            : index === 2
                              ? "bg-amber-600 text-white"
                              : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-amber-600 text-sm">
                    <span>{user.stars}</span>
                    <span>⭐</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
