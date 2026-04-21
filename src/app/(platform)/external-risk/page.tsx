"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useMonitoringStore } from "@/stores/monitoring-store";
import { monitoringSources } from "@/lib/monitoring/mock-events";

export default function ExternalRiskPage() {
  const { addEvent, events } = useMonitoringStore();
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        External feeds inform vendor DD. See consolidated alerts on a{" "}
        <Link href="/vendors/v-techcorp" className="font-medium text-blue-700 underline-offset-2 hover:underline">
          vendor profile
        </Link>{" "}
        in the KonaAI Due Diligence hub.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            const id = `evt-${now.getTime()}`;
            addEvent({
              id,
              vendorId: "v-techcorp",
              headline: "Breaking: new negative news signal detected for TechCorp",
              summary: "Auto-ingested news item matched to vendor entity. Requires triage and evidence request if validated.",
              category: "negative_news",
              severity: "high",
              status: "new",
              publishedAt: now.toISOString(),
              riskScore: 77,
              matchConfidence: 86,
              source: monitoringSources[0],
              aiRecommendation: "Recommend DD evidence request and temporary approval threshold reduction until review closes.",
            });
            setLastAddedId(id);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Simulate inbound alert
        </button>
        <Link
          href="/alerts"
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Open Alert Queue
        </Link>
        <Link
          href="/monitoring/timeline"
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          View Timeline
        </Link>
      </div>

      {lastAddedId ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
          Inbound alert simulated and added to monitoring stream. Event ID: <strong>{lastAddedId}</strong>.
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Negative news</p>
          <p className="text-3xl font-bold text-slate-900">
            {events.filter((e) => e.category === "negative_news").length}
          </p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Watchlist matches</p>
          <p className="text-3xl font-bold text-slate-900">
            {events.filter((e) => e.category === "watchlist").length}
          </p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Financial distress</p>
          <p className="text-3xl font-bold text-slate-900">
            {events.filter((e) => e.category === "financial_health").length}
          </p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        Aggregates media, sanctions, and credit-style signals into vendor-level intelligence for analysts.
      </div>
    </div>
  );
}
