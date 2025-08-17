"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Row = {
  id: string;
  name: string | null;
  score: number;
  timeMs: number | null;
  createdAt: string;
};

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    fetch("/api/scores/prompt-builder?top=10")
      .then((r) => r.json())
      .then((d) => setRows(d?.scores ?? []))
      .catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Prompt Builder Race — Top 10</h1>

      <div className="rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{r.name ?? "Anon"}</td>
                <td className="p-2">
                  {r.timeMs ? (r.timeMs / 1000).toFixed(2) + "s" : "—"}
                </td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>
                  No scores yet — be the first!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link href="/games/prompt-builder" className="btn btn-primary">
        Play Prompt Builder Race
      </Link>
    </div>
  );
}
