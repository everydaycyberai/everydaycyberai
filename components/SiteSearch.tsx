"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { SEARCH_INDEX } from "@/lib/searchIndex";

const TYPE_LABELS: Record<string, string> = {
  tool: "🛠️ Tool",
  service: "🧰 Service",
  page: "📄 Page",
};

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  };

  // Global Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX.slice(0, 8); // show a default set
    const q = query.toLowerCase();
    return SEARCH_INDEX
      .map((entry) => {
        let score = 0;
        const title = entry.title.toLowerCase();
        if (title === q) score += 100;
        else if (title.startsWith(q)) score += 50;
        else if (title.includes(q)) score += 25;
        if (entry.desc.toLowerCase().includes(q)) score += 5;
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map((r) => r.entry);
  }, [query]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActiveIdx(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[activeIdx]) {
      window.location.href = results[activeIdx].href;
      closeSearch();
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-zinc-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 px-3.5 py-2 rounded-xl text-sm transition"
      >
        <span>🔍</span>
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden lg:inline text-[10px] bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-gray-500">⌘K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4" onClick={closeSearch}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800">
              <span className="text-gray-500">🔍</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search tools, services, pages..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
              />
              <button onClick={closeSearch} className="text-gray-500 hover:text-white text-sm">ESC</button>
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="text-gray-500 text-center py-10 text-sm">No results for &quot;{query}&quot;</p>
              ) : (
                results.map((entry, idx) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    onClick={closeSearch}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`flex items-center gap-3 px-5 py-3 transition ${idx === activeIdx ? "bg-cyan-500/10" : ""}`}
                  >
                    <span className="text-xl shrink-0">{entry.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">{entry.title}</p>
                      <p className="text-gray-500 text-xs truncate">{entry.desc}</p>
                    </div>
                    <span className="text-[10px] text-gray-600 shrink-0">{TYPE_LABELS[entry.type]}</span>
                  </Link>
                ))
              )}
            </div>

            {!query && (
              <div className="border-t border-zinc-800 px-5 py-2.5 text-xs text-gray-600">
                Popular pages — type to search all tools & services
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
