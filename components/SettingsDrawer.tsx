// components/SettingsDrawer.tsx
"use client";

import { useEffect, useState } from "react";

type Prefs = {
  sound: boolean;
  theme: "light" | "dark";
  text: "sm" | "md" | "lg";
};

const KEY = "aiexg:prefs";

export default function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ sound: true, theme: "light", text: "md" });

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Prefs;
        setPrefs(saved);
        apply(saved);
      } catch {}
    } else {
      apply(prefs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function apply(p: Prefs) {
    // theme
    document.documentElement.classList.toggle("dark", p.theme === "dark");
    // text size on body
    document.body.classList.remove("text-sm", "text-base", "text-lg");
    document.body.classList.add(p.text === "sm" ? "text-sm" : p.text === "lg" ? "text-lg" : "text-base");
    // sound flag — components can read from localStorage when playing audio
    localStorage.setItem(KEY, JSON.stringify(p));
  }

  function update<K extends keyof Prefs>(k: K, v: Prefs[K]) {
    const next = { ...prefs, [k]: v };
    setPrefs(next);
    apply(next);
  }

  return (
    <>
      <button
        className="btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        ⚙️ Settings
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          aria-label="Backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[320px] bg-white dark:bg-neutral-900 text-inherit shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Settings</h2>
              <button className="btn" onClick={() => setOpen(false)} aria-label="Close settings">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sounds</div>
                  <div className="text-gray-500">Play chimes and effects</div>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-emerald-600"
                    checked={prefs.sound}
                    onChange={(e) => update("sound", e.target.checked)}
                  />
                  <span>{prefs.sound ? "On" : "Off"}</span>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-gray-500">Light or dark mode</div>
                </div>
                <select
                  value={prefs.theme}
                  onChange={(e) => update("theme", e.target.value as Prefs["theme"])}
                  className="border rounded p-1"
                  aria-label="Theme"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Text size</div>
                  <div className="text-gray-500">Adjust reading size</div>
                </div>
                <select
                  value={prefs.text}
                  onChange={(e) => update("text", e.target.value as Prefs["text"])}
                  className="border rounded p-1"
                  aria-label="Text size"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <div className="text-xs text-gray-500 border-t pt-4">
                Preferences are stored in your browser (no account required).
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
