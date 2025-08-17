"use client";
import { useState } from "react";

export default function LearnMorePanel({ summaryMdx, videoUrl }: any) {
  const [open, setOpen] = useState(false);
  return (
    <section className="border rounded-2xl p-4">
      <button className="underline text-sm" onClick={() => setOpen(!open)}>
        {open ? "Hide" : "Learn more"}
      </button>
      {open && (
        <div className="mt-3">
          {videoUrl && (
            <iframe
              src={videoUrl}
              width="100%"
              height="220"
              className="mb-3 rounded-lg"
              allowFullScreen
            />
          )}
          <div className="prose max-w-none">{summaryMdx}</div>
        </div>
      )}
    </section>
  );
}
