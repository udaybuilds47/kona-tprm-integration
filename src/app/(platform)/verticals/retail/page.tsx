"use client";

import { useAuthStore } from "@/stores/auth-store";

export default function RetailVerticalPage() {
  const { vertical, setVertical } = useAuthStore();
  const licensed = vertical === "retail";

  return (
    <div className="space-y-4">
      {!licensed ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-950">
          <p>
            Your <strong>Licensed vertical</strong> is set to <strong>{vertical}</strong>. Choose <strong>Retail</strong> in the header for PCI,
            supply chain, and weather-weighted signals.
          </p>
          <button
            type="button"
            onClick={() => setVertical("retail")}
            className="mt-2 text-sm font-medium text-amber-900 underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            Apply Retail license
          </button>
        </div>
      ) : null}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Retail risk vertical</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {licensed
            ? "Weighting emphasizes supply chain disruption, regional weather, and PCI-DSS posture for card-touching third parties."
            : "Preview of the retail pack: logistics and PCI gaps roll up with financial risk in Ariia."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Supply chain disruptions</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "19" : "—"}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">PCI-DSS gaps</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "7" : "—"}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Weather impact alerts</p>
          <p className="text-3xl font-bold text-slate-900">{licensed ? "11" : "—"}</p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        With Retail licensed, ARIA Intelligence appends retail-specific weighting notes to answers — try a vendor or O2C prompt after switching.
      </div>
    </div>
  );
}
