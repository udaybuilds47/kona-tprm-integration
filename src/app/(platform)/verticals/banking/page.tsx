"use client";

import { useAuthStore } from "@/stores/auth-store";

export default function BankingVerticalPage() {
  const { vertical, setVertical } = useAuthStore();
  const licensed = vertical === "banking";

  return (
    <div className="space-y-4">
      {!licensed ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-950">
          <p>
            Your <strong>Licensed vertical</strong> is set to <strong>{vertical}</strong>. Choose <strong>Banking</strong> in the header to unlock
            banking-weighted KPIs and copy.
          </p>
          <button
            type="button"
            onClick={() => setVertical("banking")}
            className="mt-2 text-sm font-medium text-amber-900 underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            Apply Banking license
          </button>
        </div>
      ) : null}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Banking risk vertical</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {licensed
            ? "Ontology tuned for AML watchlists, KYC refresh cadence, and OFAC — terminology and risk weights in Insights follow this license."
            : "Preview of the banking module: sanctions and KYC signals consolidate into vendor and payment risk views."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">AML matches</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "13" : "—"}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">KYC refresh due</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "28" : "—"}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">OFAC hits</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "2" : "—"}</p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        Agents can cross-reference vendor populations against regulatory updates; high-impact hits remain HITL-gated in production.
      </div>
    </div>
  );
}
