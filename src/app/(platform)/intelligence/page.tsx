"use client";

import { useState } from "react";
import { Bot, Loader2, Search, Shield } from "lucide-react";
import { ariaPromptChips } from "@/lib/mock-data/core";
import type { InsightResponse } from "@/lib/types";
import { WidgetRenderer } from "@/components/intelligence/widget-renderer";
import { useChatStore } from "@/stores/chat-store";
import { useAuthStore } from "@/stores/auth-store";

const fallbackExamples = [
  "Show me T&E expense anomalies",
  "Show P2P payment risk distribution",
  "Show O2C order to cash risk heat map",
  "Show high-risk third-party vendors with pending invoices",
  "Show recent compliance alerts",
] as const;

export default function IntelligencePage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { messages, addMessage, clear } = useChatStore();
  const { role, vertical } = useAuthStore();

  async function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setError(null);
    setLoading(true);
    addMessage({ id: crypto.randomUUID(), role: "user", content: trimmed });

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, role, vertical }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = (await res.json()) as InsightResponse;
      setResponse(data);
      addMessage({ id: crypto.randomUUID(), role: "assistant", content: data.text });
    } catch {
      setError("Could not load insights. Check your connection and try again.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  function newConversation() {
    clear();
    setQuery("");
    setResponse(null);
    setError(null);
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-4 flex gap-2 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2.5 text-sm text-blue-950">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            <span className="font-medium">Phase 1 — Ariia Insights.</span> Read-only analytics; results respect{" "}
            <strong>CAMS role</strong> and <strong>licensed vertical</strong> from the header.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr]">
          <aside className="kona-card flex h-fit flex-col gap-3 p-4">
            <button
              type="button"
              onClick={newConversation}
              className="w-full rounded-md bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              New conversation
            </button>
            <button
              type="button"
              onClick={clear}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Clear history only
            </button>
            <div>
              <label htmlFor="intel-chat-search" className="sr-only">
                Filter chat history
              </label>
              <input
                id="intel-chat-search"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Search chats (demo)…"
                disabled title="Not wired in this demo"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Recent turns</p>
              <div className="mt-2 max-h-40 space-y-2 overflow-y-auto text-xs">
                {messages.length === 0 ? (
                  <p className="text-slate-400">No messages yet. Ask a question or tap a starter prompt.</p>
                ) : (
                  messages.slice(-8).map((m) => (
                    <p key={m.id} className="break-words text-slate-600">
                      <span className="font-medium text-slate-800">{m.role === "user" ? "You" : "ARIA"}:</span>{" "}
                      {m.content.length > 120 ? `${m.content.slice(0, 120)}…` : m.content}
                    </p>
                  ))
                )}
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="border-b border-slate-100 pb-6 text-center lg:text-left">
              <div className="mx-auto inline-flex rounded-full bg-slate-100 p-3 lg:mx-0">
                <Bot className="h-7 w-7 text-slate-700" aria-hidden />
              </div>
              <h2 className="sr-only">Natural language query</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate-900 lg:mx-0">Ask in plain English</p>
              <p className="mx-auto mt-2 max-w-2xl text-slate-600 lg:mx-0">
                ARIA maps your intent to T&amp;E, P2P, O2C, vendor risk, and heat-map views — with role-aware actions.
              </p>

              <div className="mx-auto mt-6 flex max-w-3xl items-stretch gap-2 rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm lg:mx-0">
                <div className="flex flex-1 items-center gap-2 pl-3">
                  <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading) submit(query);
                    }}
                    className="min-w-0 flex-1 border-none bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
                    placeholder="e.g. Show high-risk vendors with pending invoices…"
                    disabled={loading}
                    aria-busy={loading}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => submit(query)}
                  disabled={loading || !query.trim()}
                  className="shrink-0 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      <span className="sr-only">Loading</span>
                    </span>
                  ) : (
                    "Ask"
                  )}
                </button>
              </div>

              <div className="mt-6 text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Starter prompts</p>
                <div className="max-h-44 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/80 p-2">
                  <div className="flex flex-wrap gap-2">
                    {ariaPromptChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => {
                          setQuery(chip);
                          submit(chip);
                        }}
                        disabled={loading}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50/50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900" role="alert">
                {error}
              </div>
            ) : null}

            {response && !error ? (
              <div className="mt-8 space-y-4">
                <div className="kona-card p-4 md:p-5">
                  <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">{response.text}</p>
                  {response.actions && response.actions.length > 0 ? (
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">High-impact actions</p>
                      <p className="mb-3 text-xs text-slate-500">Shown only when your CAMS role allows execution (demo).</p>
                      <div className="flex flex-wrap gap-2">
                        {response.actions.map((a) => (
                          <button
                            key={a.label}
                            type="button"
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                          >
                            {a.label}
                            <span className="ml-2 rounded bg-red-200/60 px-1.5 py-0.5 text-xs">{a.risk} risk</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                {response.widgets.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-600">
                      I could not map that prompt to a demo visualization yet. Try one of these:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fallbackExamples.map((example) => (
                        <button
                          key={example}
                          type="button"
                          onClick={() => {
                            setQuery(example);
                            submit(example);
                          }}
                          disabled={loading}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50/50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  response.widgets.map((widget) => <WidgetRenderer key={widget.id} widget={widget} />)
                )}
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
