"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { rules } from "@/lib/mock-data/core";
import { useAuthStore } from "@/stores/auth-store";

type RulePreview = {
  name: string;
  condition: string;
  threshold: number;
  projectedMatches: number;
  projectedFalsePositiveRate: number;
};

export default function RulesPage() {
  const { role, setRole } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<RulePreview | null>(null);
  const [simulating, setSimulating] = useState(false);

  async function simulate() {
    if (!prompt.trim()) return;
    setSimulating(true);
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as { preview: RulePreview };
      setPreview(data.preview);
    } finally {
      setSimulating(false);
    }
  }

  if (role !== "Customer Success") {
    return (
      <div className="kona-card p-6 md:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <Lock className="h-7 w-7 text-slate-600" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-slate-900">Rule Architect is restricted</h2>
            <p className="mt-2 text-slate-600">
              Phase 1 limits this workspace to <strong>Customer Success</strong> so CSMs can translate customer language into rules before end users
              see them.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              To explore this screen in the demo, open <strong>Demo persona &amp; license</strong> (mobile) or use the{" "}
              <strong>CAMS role</strong> control and choose <strong>Customer Success</strong>.
            </p>
            <button
              type="button"
              onClick={() => setRole("Customer Success")}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Switch to Customer Success
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-2 text-sm text-slate-700">
        <span className="font-medium">CS workspace.</span> Describe a policy in English, run a dry-run on historical CAMS data, then promote when
        false positives look acceptable.
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="kona-card p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-slate-900">Rules library</h2>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              New rule
            </button>
          </div>
          <ul className="max-h-[min(520px,55vh)] space-y-3 overflow-y-auto pr-1">
            {rules.map((rule) => (
              <li key={rule.id} className="rounded-lg border border-slate-200 p-3 hover:border-slate-300">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium text-slate-900">{rule.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                      rule.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {rule.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{rule.desc}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {rule.triggers} triggers · {rule.date}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="kona-card p-4 md:p-5">
          <h2 className="font-semibold text-slate-900">AI rules assistant</h2>
          <p className="mt-2 text-sm text-slate-600">Turn a customer request into structured logic, then validate with a simulation.</p>

          <label htmlFor="rule-prompt" className="mt-4 block text-xs font-medium text-slate-500">
            Natural language rule
          </label>
          <textarea
            id="rule-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            rows={5}
            placeholder='Example: "Flag P2P invoices over $10k missing a PO"'
          />

          <button
            type="button"
            onClick={simulate}
            disabled={simulating || !prompt.trim()}
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {simulating ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Run dry-run simulation
          </button>

          {preview ? (
            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/90 p-4">
              <p className="text-sm font-semibold text-blue-950">Simulation preview</p>
              <dl className="mt-3 space-y-2 text-sm text-blue-900">
                <div className="flex justify-between gap-4">
                  <dt className="text-blue-800/80">Condition</dt>
                  <dd className="font-medium">{preview.condition}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-blue-800/80">Threshold</dt>
                  <dd className="font-medium">{preview.threshold}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-blue-800/80">Projected matches</dt>
                  <dd className="font-medium">{preview.projectedMatches}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-blue-800/80">Est. false positive rate</dt>
                  <dd className="font-medium">{preview.projectedFalsePositiveRate}%</dd>
                </div>
              </dl>
              <button
                type="button"
                title="Demo only — does not deploy to CAMS"
                className="mt-4 rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Push live (demo)
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
