"use client";

import { useState } from "react";

export default function StudentCard() {
  const [score, setScore] = useState(90);
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border-l-4 border-[#22c55e]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#1f2937] tracking-wide">
            Anu
          </h2>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-xl font-bold text-[#4b5563] shadow-inner border border-gray-100">
            A
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-lg font-medium text-[#6b7280]">Score</span>
            <div className="mt-2">
              <span className="inline-block rounded-full bg-[#dcfce7] px-4 py-1.5 text-sm font-semibold text-[#15803d]">
                Passed
              </span>
            </div>
          </div>
          <span className="text-4xl font-bold text-[#1f2937] tracking-tight">
            {score}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button>+5 Bonus</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}
