"use client";
import { useMemo, useState } from "react";

type Choice = { id: string; textMdx: string; isCorrect: boolean };
type Question = { id: string; stemMdx: string; explanationMdx: string; choices: Choice[] };

export default function QuizCard({
  question,
  onNext,
  isLast,
}: {
  question: Question;
  onNext: (correctOnThisQuestion: boolean) => void;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Shuffle choices once per question (stable for this render cycle)
  const shuffledChoices = useMemo(() => {
    // simple Fisher–Yates
    const arr = [...question.choices];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // re-run only when question.id changes
  }, [question.id]);

  // Preload audio once in browser
  const correctAudio = useMemo(() => {
    if (typeof window === "undefined") return null;
    const a = new Audio("/sounds/correct-chime.mp3");
    a.volume = 0.6; // tweak if you want softer/louder
    return a;
  }, []);

  function submit() {
    if (!selected) return;
    setRevealed(true);

    const chosen = shuffledChoices.find((c) => c.id === selected);
    const correct = Boolean(chosen?.isCorrect);
    if (correct && correctAudio) {
      try {
        correctAudio.currentTime = 0;
        correctAudio.play();
      } catch {
        // ignore autoplay errors
      }
    }
  }

  function next() {
    const chosen = shuffledChoices.find((c) => c.id === selected);
    const correct = Boolean(chosen?.isCorrect);
    onNext(correct);
    // reset local state; parent moves to next question or finish screen
    setSelected(null);
    setRevealed(false);
  }

  return (
    <section className="card">
      <div className="mb-3 font-medium">{question.stemMdx}</div>

      <div className="flex flex-col gap-2">
        {shuffledChoices.map((c) => {
          const isChosen = selected === c.id;
          const isCorrect = revealed && c.isCorrect;
          const isWrong = revealed && isChosen && !c.isCorrect;
          return (
            <button
              key={c.id}
              onClick={() => !revealed && setSelected(c.id)}
              className={[
                "text-left border rounded-xl p-3 transition",
                isChosen && !revealed ? "ring-2 ring-black/20" : "",
                isCorrect ? "bg-green-50 border-green-600" : "",
                isWrong ? "bg-red-50 border-red-600" : "",
              ].join(" ")}
              aria-pressed={isChosen}
            >
              {c.textMdx}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        {!revealed ? (
          <button
            disabled={!selected}
            onClick={submit}
            className="btn btn-primary disabled:opacity-50"
          >
            Check
          </button>
        ) : (
          <button onClick={next} className="btn btn-primary">
            {isLast ? "Finish" : "Next"}
          </button>
        )}
      </div>

      {revealed && (
        <div className="mt-3 text-sm text-gray-700">{question.explanationMdx}</div>
      )}
    </section>
  );
}
