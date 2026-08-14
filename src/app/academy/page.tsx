'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AcademyPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: 'Module 1: Multi-Agent Architecture',
      desc: 'Learn how Signal Agent, Risk Guard, and Execution Engine collaborate in real-time.',
      time: '5 min read',
    },
    {
      id: 2,
      title: 'Module 2: Risk Guard & Sizing Controls',
      desc: 'Understanding the $100 Demo minimum vs $10 Live safety cap overrides.',
      time: '4 min read',
    },
    {
      id: 3,
      title: 'Module 3: Connecting Binance Safely via API',
      desc: 'How to configure read/trade API keys without giving withdrawal access.',
      time: '6 min read',
    },
  ];

  const toggleLesson = (id: number) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🎓</span> AI Trading Academy
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Master automated trading workflows and safety configurations.
          </p>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isDone = completedLessons.includes(lesson.id);
            return (
              <div key={lesson.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{lesson.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{lesson.desc}</p>
                  <span className="text-[10px] text-cyan-400 font-mono mt-2 block">⏱️ {lesson.time}</span>
                </div>

                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  {isDone ? '✓ COMPLETED' : 'START LESSON'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </Sidebar>
  );
}