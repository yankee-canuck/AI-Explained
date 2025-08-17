"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "./QuizCard";

export default function LessonView({ lesson }: { lesson: any }) {
  const router = useRouter();
  const questions = useMemo(() => lesson.questions ?? [], [lesson.questions]);
  const total = questions.length;

  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const isLast = idx === total - 1;
  const q = questions[idx];

  async function handleNext(correctOnThisQuestion: boolean) {
    if (correctOnThisQuestion) setCorrectCount((x) => x + 1);

    if (!isLast) {
      setIdx((i) => i + 1);
    } else {
      setFinished(true);
      // Optional: persist XP/score here
      // await fetch("/api/xp/award", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "demo@user.com", amount: correctOnThisQuestion ? 10 : 0 }) });

      // Optional: auto-return home after 2.5s
      // setTimeout(() => router.push("/"), 2500);
    }
  }

  if (!q && !finished) {
    return <div className="rounded-2xl border p-4">No questions found.</div>;
  }

  if (finished) {
    const score = `${correctCount} / ${total}`;
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">{lesson.title}</h1>
        <div className="rounded-2xl border p-4">
          <p className="mb-2 font-medium">You’re done! 🎉</p>
          <p className="mb-1">Score: <b>{score}</b></p>
          <p className="text-sm text-gray-600">Nice work—want to try another lesson or a game?</p>
          <a href="/" className="btn btn-primary mt-3 inline-block">Back to home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{lesson.title}</h1>
        <div className="text-sm text-gray-600">
          {idx + 1} / {total}
        </div>
      </div>

      <QuizCard
        key={q.id}                 // ensures internal state resets per question
        question={q}
        onNext={handleNext}
        isLast={isLast}
      />
    </div>
  );
}
