"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/* ---------------------------------------------------------------
 * 1) TERMS + CLUES  (edit freely)
 * --------------------------------------------------------------*/
type Entry = { term: string; clue: string };
const GLOSSARY: Entry[] = [
  { term: "Artificial Intelligence", clue: "A computer that can learn and make smart guesses about things it was taught." },
  { term: "Machine Learning", clue: "When a computer gets better at something by practicing with lots of examples." },
  { term: "Large Language Model", clue: "A super-big text brain that learned from tons of words." },
  { term: "Neural Network", clue: "A mathy brain made of tiny pieces that work together, like pretend neurons." },
  { term: "Transformer", clue: "A model that pays attention to important words to understand meaning better." },
  { term: "Training Data", clue: "All the examples (like books and websites) the AI studied to learn." },
  { term: "Context Window", clue: "How much the AI can remember at once while talking to you." },
  { term: "Prompt", clue: "Your instruction or question that tells the AI what to do." },
  { term: "Prompt Engineering", clue: "Asking in a smart way so the AI gives better answers." },
  { term: "Temperature", clue: "A creativity knob: low = safe and simple, high = wild and creative." },
  { term: "Inference", clue: "When the AI thinks and gives an answer (not learning time)." },
  { term: "Hallucination", clue: "When the AI makes up something that sounds real but isn’t true." },
  { term: "Embedding", clue: "Turning text into numbers so the AI can compare meanings quickly." },
  { term: "Fine Tuning", clue: "Teaching an already-trained AI to be great at one special job." },
  { term: "Multimodal", clue: "An AI that can handle more than one kind of stuff (like text and images)." },
  { term: "API", clue: "A bridge that lets apps and websites talk to the AI." },
  { term: "Bias", clue: "When answers lean a certain way because of the data the AI learned from." },
  { term: "Ethics in AI", clue: "Making sure AI is fair, safe, and helpful for everyone." },
];

/* ---------------------------------------------------------------
 * 2) Crossword builder (places words with real overlaps)
 * --------------------------------------------------------------*/
type Cell = { ch: string | null; block?: boolean; r: number; c: number };
type Placed = {
  id: number;
  r: number;
  c: number;
  dir: "A" | "D";
  answer: string;
  label: number;
  clue: string;
};

const DIRS = { A: [0, 1] as const, D: [1, 0] as const };

function clean(s: string) {
  return s.toUpperCase().replace(/[^A-Z]/g, "");
}

function buildCrossword(entries: Entry[]) {
  const cleaned = entries
    .map((e) => ({ ...e, answer: clean(e.term) }))
    .filter((e) => e.answer.length >= 3);

  const longest = Math.max(...cleaned.map((e) => e.answer.length));
  const max = Math.min(45, Math.max(25, longest + 8)); // Increased size for better balance

  const grid: Cell[][] = Array.from({ length: max }, (_, r) =>
    Array.from({ length: max }, (_, c) => ({ ch: null, r, c })),
  );
  const placed: Placed[] = [];
  let label = 1;

  const inBounds = (r: number, c: number) => r >= 0 && r < max && c >= 0 && c < max;

  function canPlace(r: number, c: number, dir: "A" | "D", answer: string) {
    const [dr, dc] = DIRS[dir];
    for (let i = 0; i < answer.length; i++) {
      const rr = r + dr * i;
      const cc = c + dc * i;
      if (!inBounds(rr, cc)) return false;
      const cell = grid[rr][cc];
      if (cell.block) return false;
      if (cell.ch && cell.ch !== answer[i]) return false;

      // avoid side collisions
      if (!cell.ch) {
        const s1r = rr + (dir === "A" ? -1 : 0);
        const s1c = cc + (dir === "A" ? 0 : -1);
        const s2r = rr + (dir === "A" ? 1 : 0);
        const s2c = cc + (dir === "A" ? 0 : 1);
        if (inBounds(s1r, s1c) && grid[s1r][s1c].ch) return false;
        if (inBounds(s2r, s2c) && grid[s2r][s2c].ch) return false;
      }
    }
    // no glued letters before/after
    const pr = r - DIRS[dir][0];
    const pc = c - DIRS[dir][1];
    const tr = r + DIRS[dir][0] * answer.length;
    const tc = c + DIRS[dir][1] * answer.length;
    if (inBounds(pr, pc) && grid[pr][pc].ch) return false;
    if (inBounds(tr, tc) && grid[tr][tc].ch) return false;
    return true;
  }

  function place(r: number, c: number, dir: "A" | "D", answer: string, clue: string) {
    const [dr, dc] = DIRS[dir];
    for (let i = 0; i < answer.length; i++) {
      grid[r + dr * i][c + dc * i].ch = answer[i];
    }
    placed.push({ id: placed.length, r, c, dir, answer, label: label++, clue });
  }

  // Sort entries by length for better placement strategy
  const sortedEntries = [...cleaned].sort((a, b) => b.answer.length - a.answer.length);
  
  // Separate entries for across and down to ensure balance
  const acrossEntries: typeof sortedEntries = [];
  const downEntries: typeof sortedEntries = [];
  
  // Distribute entries evenly between across and down
  sortedEntries.forEach((entry, index) => {
    if (index % 2 === 0) {
      acrossEntries.push(entry);
    } else {
      downEntries.push(entry);
    }
  });

  // seed with the longest word, centered
  const seed = sortedEntries[0];
  const seedRow = Math.floor(max / 2);
  const seedStartC = Math.max(0, Math.floor((max - seed.answer.length) / 2));
  if (canPlace(seedRow, seedStartC, "A", seed.answer)) {
    place(seedRow, seedStartC, "A", seed.answer, seed.clue);
  } else {
    outerSeed: for (let r = 0; r < max; r++) {
      for (let c = 0; c < max; c++) {
        if (canPlace(r, c, "A", seed.answer)) {
          place(r, c, "A", seed.answer, seed.clue);
          break outerSeed;
        }
      }
    }
  }

  // Place across words first
  for (const e of acrossEntries) {
    if (e.answer === seed.answer) continue;
    
    let wordPlaced = false;
    // Try to place at intersections
    for (const p of placed) {
      for (let i = 0; i < p.answer.length; i++) {
        const ch = p.answer[i];
        for (let j = 0; j < e.answer.length; j++) {
          if (e.answer[j] !== ch) continue;
          const dir: "A" | "D" = p.dir === "A" ? "D" : "A";
          const r = p.r + DIRS[p.dir][0] * i - DIRS[dir][0] * j;
          const c = p.c + DIRS[p.dir][1] * i - DIRS[dir][1] * j;
          if (canPlace(r, c, dir, e.answer)) {
            place(r, c, dir, e.answer, e.clue);
            wordPlaced = true;
            break;
          }
        }
        if (wordPlaced) break;
      }
      if (wordPlaced) break;
    }
    
    // Fallback placement
    if (!wordPlaced) {
      for (let r = 0; r < max; r++) {
        for (let c = 0; c < max; c++) {
          if (canPlace(r, c, "A", e.answer)) {
            place(r, c, "A", e.answer, e.clue);
            wordPlaced = true;
            break;
          }
        }
        if (wordPlaced) break;
      }
    }
  }

  // Place down words
  for (const e of downEntries) {
    if (e.answer === seed.answer) continue;
    
    let wordPlaced = false;
    // Try to place at intersections
    for (const p of placed) {
      for (let i = 0; i < p.answer.length; i++) {
        const ch = p.answer[i];
        for (let j = 0; j < e.answer.length; j++) {
          if (e.answer[j] !== ch) continue;
          const dir: "A" | "D" = p.dir === "A" ? "D" : "A";
          const r = p.r + DIRS[p.dir][0] * i - DIRS[dir][0] * j;
          const c = p.c + DIRS[p.dir][1] * i - DIRS[dir][1] * j;
          if (canPlace(r, c, dir, e.answer)) {
            place(r, c, dir, e.answer, e.clue);
            wordPlaced = true;
            break;
          }
        }
        if (wordPlaced) break;
      }
      if (wordPlaced) break;
    }
    
    // Fallback placement
    if (!wordPlaced) {
      for (let r = 0; r < max; r++) {
        for (let c = 0; c < max; c++) {
          if (canPlace(r, c, "D", e.answer)) {
            place(r, c, "D", e.answer, e.clue);
            wordPlaced = true;
            break;
          }
        }
        if (wordPlaced) break;
      }
    }
  }

  // find used bounds
  const used = grid.flat().filter((c) => c.ch).map((c) => [c.r, c.c]);
  const rs = used.map((x) => x[0]);
  const cs = used.map((x) => x[1]);
  const rmin = Math.max(0, Math.min(...rs) - 1);
  const rmax = Math.min(max - 1, Math.max(...rs) + 1);
  const cmin = Math.max(0, Math.min(...cs) - 1);
  const cmax = Math.min(max - 1, Math.max(...cs) + 1);

  // inside the bounds: any empty cell becomes a BLACK BLOCK (classic look)
  for (let r = rmin; r <= rmax; r++) {
    for (let c = cmin; c <= cmax; c++) {
      if (!grid[r][c].ch) grid[r][c].block = true;
    }
  }
  // outside bounds: keep empty to visually fade (no need to render anyway)

  return { grid, placed, bounds: { rmin, rmax, cmin, cmax } };
}

/* ---------------------------------------------------------------
 * 3) Component (fit-to-page, numbers, highlight, sound FX)
 * --------------------------------------------------------------*/
export default function CrosswordPage() {
  const { grid, placed, bounds } = useMemo(() => buildCrossword(GLOSSARY), []);
  const rowsAll = grid.length;
  const colsAll = grid[0].length;

  // Only render the “active” bounding box
  const rowCount = bounds.rmax - bounds.rmin + 1;
  const colCount = bounds.cmax - bounds.cmin + 1;

  // dynamic cell size so grid fits viewport without scrolling
  const [cellSize, setCellSize] = useState(24); // px
  const gap = 2; // px

  useEffect(() => {
    function recalc() {
      const header = 80; // approx top nav
      const footer = 24;
      const availH = Math.max(500, window.innerHeight - header - footer - 180); // leave room for actions
      // we want grid height to be <= availH
      const sizeByHeight = Math.floor((availH - (rowCount - 1) * gap) / rowCount);
      // also keep width reasonable (sidebar ~ 340px)
      const availW = Math.max(700, window.innerWidth - 380);
      const sizeByWidth = Math.floor((availW - (colCount - 1) * gap) / colCount);
      const size = Math.max(16, Math.min(28, sizeByHeight, sizeByWidth));
      setCellSize(size);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [rowCount, colCount]);

  const [letters, setLetters] = useState<string[][]>(() =>
    grid.map((row) => row.map(() => "")),
  );
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [activeWord, setActiveWord] = useState<Placed | null>(null);
  const [checked, setChecked] = useState(false);

  // refs
  const inputsRef = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: rowsAll }, () => Array.from({ length: colsAll }, () => null)),
  );
  const chimeRef = useRef<HTMLAudioElement | null>(null);
  const celebrated = useRef<Set<number>>(new Set());

  // preload sound once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const a = new Audio("/sounds/correct-chime.mp3");
      a.volume = 0.6;
      chimeRef.current = a;
    }
  }, []);
  const playChime = () => {
    try {
      if (chimeRef.current) {
        chimeRef.current.currentTime = 0;
        chimeRef.current.play().catch(() => {});
      }
    } catch {}
  };

  // map: cell -> words that pass through it
  const cellToWords = useMemo(() => {
    const map: Record<string, Placed[]> = {};
    for (const p of placed) {
      const [dr, dc] = DIRS[p.dir];
      for (let i = 0; i < p.answer.length; i++) {
        const key = `${p.r + dr * i}:${p.c + dc * i}`;
        (map[key] ||= []).push(p);
      }
    }
    return map;
  }, [placed]);

  // start numbers map for cells
  const startLabelMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of placed) m.set(`${p.r}:${p.c}`, p.label);
    return m;
  }, [placed]);

  function focusCell(r: number, c: number, preferDir?: "A" | "D") {
    setActive({ r, c });
    const list = cellToWords[`${r}:${c}`] || [];
    const next = preferDir ? list.find((w) => w.dir === preferDir) || list[0] : list[0];
    if (next) setActiveWord(next);
    const el = inputsRef.current?.[r]?.[c];
    el?.focus();
    el?.select();
  }

  function move(r: number, c: number, dir: "A" | "D", delta: 1 | -1 = 1) {
    const [dr, dc] = DIRS[dir];
    let rr = r;
    let cc = c;
    while (true) {
      rr += dr * delta;
      cc += dc * delta;
      if (rr < bounds.rmin || rr > bounds.rmax || cc < bounds.cmin || cc > bounds.cmax) return;
      const cell = grid[rr][cc];
      if (cell.ch && !cell.block) {
        focusCell(rr, cc, dir);
        return;
      }
    }
  }

  function jumpToWord(p: Placed) {
    setActiveWord(p);
    focusCell(p.r, p.c, p.dir);
  }

  function step(r: number, c: number, dir: "A" | "D", delta: 1 | -1) {
    const [dr, dc] = DIRS[dir];
    let rr = r;
    let cc = c;
    while (true) {
      rr += dr * delta;
      cc += dc * delta;
      if (rr < bounds.rmin || rr > bounds.rmax || cc < bounds.cmin || cc > bounds.cmax) return [null, null] as const;
      const cell = grid[rr][cc];
      if (cell.ch && !cell.block) return [rr, cc] as const;
    }
  }

  function gotoNextClue() {
    if (!activeWord) return;
    const idx = placed.findIndex((p) => p.id === activeWord.id);
    const next = placed[(idx + 1) % placed.length];
    jumpToWord(next);
  }

  function wordCorrect(p: Placed, state: string[][]) {
    const [dr, dc] = DIRS[p.dir];
    for (let i = 0; i < p.answer.length; i++) {
      if (state[p.r + dr * i][p.c + dc * i] !== p.answer[i]) return false;
    }
    return true;
  }

  function evaluateAndCelebrate(nextState: string[][]) {
    for (const p of placed) {
      if (wordCorrect(p, nextState) && !celebrated.current.has(p.id)) {
        celebrated.current.add(p.id);
        playChime();
      }
    }
    if (placed.every((p) => celebrated.current.has(p.id))) {
      playChime();
    }
  }

  function onKeyDown(e: React.KeyboardEvent, r: number, c: number) {
    const dir = activeWord?.dir || "A";
    if (e.key === "ArrowRight") { e.preventDefault(); move(r, c, "A", 1); return; }
    if (e.key === "ArrowLeft")  { e.preventDefault(); move(r, c, "A", -1); return; }
    if (e.key === "ArrowDown")  { e.preventDefault(); move(r, c, "D", 1); return; }
    if (e.key === "ArrowUp")    { e.preventDefault(); move(r, c, "D", -1); return; }
    if (e.key === "Enter")      { e.preventDefault(); gotoNextClue(); return; }

    if (e.key === "Backspace") {
      e.preventDefault();
      setLetters((prev) => {
        const next = prev.map((row) => row.slice());
        if (next[r][c]) {
          next[r][c] = "";
        } else {
          const [pr, pc] = step(r, c, dir, -1);
          if (pr !== null && pc !== null) {
            next[pr][pc] = "";
            focusCell(pr, pc, dir);
          }
        }
        evaluateAndCelebrate(next);
        return next;
      });
      return;
    }

    const ch = e.key.toUpperCase();
    if (/^[A-Z]$/.test(ch)) {
      e.preventDefault();
      setLetters((prev) => {
        const next = prev.map((row) => row.slice());
        next[r][c] = ch;
        evaluateAndCelebrate(next);
        return next;
      });
      const [nr, nc] = step(r, c, dir, 1);
      if (nr !== null && nc !== null) focusCell(nr, nc, dir);
    }
  }

  // Actions
  const check = () => setChecked(true);
  function clearAll() {
    setLetters(grid.map((row) => row.map(() => "")));
    setChecked(false);
    setActive(null);
    setActiveWord(null);
    celebrated.current.clear();
  }
  function revealLetter() {
    if (!active) return;
    const { r, c } = active;
    if (!grid[r][c].ch) return;
    setLetters((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = grid[r][c].ch!;
      evaluateAndCelebrate(next);
      return next;
    });
  }
  function revealWord() {
    if (!activeWord) return;
    const p = activeWord;
    const [dr, dc] = DIRS[p.dir];
    setLetters((prev) => {
      const next = prev.map((row) => row.slice());
      for (let i = 0; i < p.answer.length; i++) {
        next[p.r + dr * i][p.c + dc * i] = p.answer[i];
      }
      evaluateAndCelebrate(next);
      return next;
    });
  }
  function revealAll() {
    setLetters(() => {
      const next = grid.map((row) => row.map((c) => (c.ch ? c.ch : "")));
      celebrated.current = new Set(placed.map((p) => p.id));
      playChime();
      return next;
    });
  }

  function inActiveWord(r: number, c: number) {
    if (!activeWord) return false;
    const { r: rr, c: cc, dir, answer } = activeWord;
    const [dr, dc] = DIRS[dir];
    for (let i = 0; i < answer.length; i++) {
      if (rr + dr * i === r && cc + dc * i === c) return true;
    }
    return false;
  }

  // Focus a sensible first cell
  useEffect(() => {
    for (let r = bounds.rmin; r <= bounds.rmax; r++) {
      for (let c = bounds.cmin; c <= bounds.cmax; c++) {
        const cell = grid[r][c];
        if (cell.ch && !cell.block) { focusCell(r, c, "A"); return; }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // styles for grid sizing
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${colCount}, ${cellSize}px)`,
    gap: `${gap}px`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-2 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GenAI Crossword</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your AI knowledge with this interactive crossword puzzle. Use arrow keys to navigate and type to fill in the answers.
          </p>
        </div>

        {/* Game Container */}
        <div className="grid lg:grid-cols-[1fr_700px] gap-4 items-start">
          {/* LEFT: Crossword Board */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Crossword Grid</h2>
              <p className="text-sm text-gray-600">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←↑→↓</kbd> move • <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Backspace</kbd> erase • <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> next clue
              </p>
            </div>

            {/* Grid Container */}
            <div className="flex justify-center mb-6">
              <div className="inline-grid p-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm" style={gridStyle}>
                {grid.slice(bounds.rmin, bounds.rmax + 1).map((row, ri) =>
                  row.slice(bounds.cmin, bounds.cmax + 1).map((cell, ci) => {
                    const r = ri + bounds.rmin;
                    const c = ci + bounds.cmin;

                    // black block
                    if (cell.block) {
                      return (
                        <div
                          key={`${r}:${c}`}
                          className="rounded-sm bg-gray-800"
                          style={{ width: cellSize, height: cellSize }}
                          aria-hidden
                        />
                      );
                    }

                    if (!cell.ch) {
                      return <div key={`${r}:${c}`} style={{ width: cellSize, height: cellSize }} />;
                    }

                    const value = letters[r][c] || "";
                    const isWrong = checked && value && value !== grid[r][c].ch;
                    const isActiveCell = active?.r === r && active?.c === c;
                    const inWord = inActiveWord(r, c);
                    const label = startLabelMap.get(`${r}:${c}`);

                    return (
                      <div
                        key={`${r}:${c}`}
                        className={[
                          "relative rounded-sm ring-1 transition-all duration-150",
                          inWord ? "bg-amber-50 ring-amber-300" : "bg-white ring-gray-300",
                          isActiveCell ? "outline outline-2 outline-blue-500 ring-blue-400" : "",
                        ].join(" ")}
                        style={{ width: cellSize, height: cellSize }}
                        onClick={() => focusCell(r, c)}
                      >
                        {/* Start number */}
                        {label ? (
                          <div
                            className="absolute text-[10px] leading-none text-gray-600 font-medium"
                            style={{ top: 2, left: 3 }}
                          >
                            {label}
                          </div>
                        ) : null}

                        <input
                          ref={(el: HTMLInputElement | null) => {
                            inputsRef.current[r][c] = el;
                          }}
                          value={value}
                          onChange={() => {}}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          className={[
                            "absolute inset-0 w-full h-full text-center font-semibold uppercase tracking-wide",
                            "focus:outline-none transition-colors duration-150",
                            isWrong ? "text-red-600" : "text-gray-900",
                          ].join(" ")}
                          style={{ fontSize: Math.floor(cellSize * 0.62) }}
                          maxLength={1}
                          aria-label={`Row ${r + 1}, Column ${c + 1}`}
                        />
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={check} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Check Answers
              </button>
              <button onClick={revealLetter} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                Reveal Letter
              </button>
              <button onClick={revealWord} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                Reveal Word
              </button>
              <button onClick={clearAll} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                Clear All
              </button>
              <button onClick={revealAll} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                Reveal All
              </button>
            </div>
          </section>

          {/* RIGHT: Clues Panel */}
          <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Clues</h2>

            <div className="space-y-4">
              {/* Across and Down Clues - Side by Side */}
              <div className="grid grid-cols-2 gap-6">
                {/* Across Clues */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-800 text-base">Across</h3>
                  </div>
                  <ul className="space-y-2">
                    {placed.filter((p) => p.dir === "A").map((p) => {
                      const activeCls = activeWord?.id === p.id 
                        ? "bg-blue-50 border-blue-300 text-blue-900 shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:shadow-sm";
                      return (
                        <li key={p.id}>
                          <button
                            className={`text-left rounded-lg p-3 w-full border transition-all duration-150 ${activeCls}`}
                            onClick={() => jumpToWord(p)}
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-bold text-blue-600 min-w-[20px] text-sm">{p.label}.</span>
                              <div className="flex-1">
                                <div className="text-sm leading-tight font-medium">{p.clue}</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">({p.answer.length} letters)</div>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Down Clues */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-800 text-base">Down</h3>
                  </div>
                  <ul className="space-y-2">
                    {placed.filter((p) => p.dir === "D").map((p) => {
                      const activeCls = activeWord?.id === p.id 
                        ? "bg-purple-50 border-purple-300 text-purple-900 shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:shadow-sm";
                      return (
                        <li key={p.id}>
                          <button
                            className={`text-left rounded-lg p-3 w-full border transition-all duration-150 ${activeCls}`}
                            onClick={() => jumpToWord(p)}
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-bold text-purple-600 min-w-[20px] text-sm">{p.label}.</span>
                              <div className="flex-1">
                                <div className="text-sm leading-tight font-medium">{p.clue}</div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">({p.answer.length} letters)</div>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <Link 
                href="/games" 
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Games
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
