"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import type { MonitoringEvent, MonitoringSeverity } from "@/lib/types";
import { useMonitoringStore, categoryLabel } from "@/stores/monitoring-store";
import { vendors } from "@/lib/mock-data/core";

const dot: Record<MonitoringSeverity, string> = {
  critical: "bg-rose-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

export default function MonitoringTimelinePage() {
  const { events } = useMonitoringStore();
  const [vendorId, setVendorId] = useState<string>("all");
  const [severity, setSeverity] = useState<MonitoringSeverity | "all">("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const vendorMap = useMemo(() => new Map(vendors.map((v) => [v.id, v.name] as const)), []);

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        if (vendorId !== "all" && e.vendorId !== vendorId) return false;
        if (severity !== "all" && e.severity !== severity) return false;
        return true;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [events, vendorId, severity]);

  const patterns = useMemo(() => {
    // Pattern: 3+ events in 7 days for same vendor
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const byVendor = new Map<string, MonitoringEvent[]>();
    for (const e of events) byVendor.set(e.vendorId, [...(byVendor.get(e.vendorId) ?? []), e]);
    const hits: { vendorId: string; count: number; range: string }[] = [];
    for (const [vid, list] of byVendor.entries()) {
      const asc = [...list].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      for (let i = 0; i < asc.length; i++) {
        const start = new Date(asc[i].publishedAt).getTime();
        const inWindow = asc.filter((x) => {
          const t = new Date(x.publishedAt).getTime();
          return t >= start && t <= start + sevenDays;
        });
        if (inWindow.length >= 3) {
          const first = new Date(inWindow[0].publishedAt);
          const last = new Date(inWindow[inWindow.length - 1].publishedAt);
          hits.push({
            vendorId: vid,
            count: inWindow.length,
            range: `${first.toLocaleDateString()} – ${last.toLocaleDateString()}`,
          });
          break;
        }
      }
    }
    return hits;
  }, [events]);

  const dateGroups = useMemo(() => {
    const groups = new Map<string, MonitoringEvent[]>();
    for (const e of filtered) {
      const key = new Date(e.publishedAt).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
      groups.set(key, [...(groups.get(key) ?? []), e]);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700">
        <span className="font-medium">Continuous monitoring timeline.</span> Chronological view of vendor risk events with simple pattern detection.
      </div>

      <div className="kona-card p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="all">All vendors</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as typeof severity)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="all">All severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <span className="ml-auto text-sm text-slate-500">{filtered.length} event{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </div>

      {patterns.length > 0 ? (
        <div className="space-y-2">
          {patterns.map((p) => (
            <div key={p.vendorId} className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden />
                <div>
                  <p className="font-medium">Pattern detected: {vendorMap.get(p.vendorId) ?? p.vendorId}</p>
                  <p className="text-xs text-amber-900/80">
                    {p.count} events within 7 days ({p.range}). Consider escalating review cadence.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="space-y-0">
        {dateGroups.map(([date, list], gi) => (
          <div key={date} className="relative">
            <div className="flex items-center gap-3 py-3">
              <span className="w-[160px] shrink-0 text-right text-xs font-medium text-slate-500">{date}</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {list.map((e, ei) => {
              const isOpen = expanded.has(e.id);
              return (
                <div key={e.id} className="flex gap-3 pb-3">
                  <div className="w-[160px] shrink-0 pt-3 text-right text-xs text-slate-400">
                    {new Date(e.publishedAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  </div>

                  <div className="flex shrink-0 flex-col items-center">
                    <div className={`mt-3.5 h-2.5 w-2.5 rounded-full ${dot[e.severity]} ring-2 ring-white`} />
                    {(ei < list.length - 1 || gi < dateGroups.length - 1) ? <div className="mt-1 w-px flex-1 bg-slate-200" /> : null}
                  </div>

                  <div
                    className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white p-4 transition hover:bg-slate-50/60"
                    onClick={() => toggle(e.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{categoryLabel(e.category)}</span>
                          <span className="text-xs text-slate-400">Source: {e.source.name}</span>
                          <span className="text-xs text-slate-400">Match {e.matchConfidence}%</span>
                        </div>
                        <p className="font-medium text-slate-900">{e.headline}</p>
                        <Link
                          href={`/vendors/${e.vendorId}`}
                          className="mt-1 inline-block text-xs font-medium text-blue-700 underline-offset-2 hover:underline"
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          Open vendor DD hub: {vendorMap.get(e.vendorId) ?? e.vendorId}
                        </Link>
                      </div>
                      {isOpen ? <ChevronDown className="mt-0.5 h-4 w-4 text-slate-500" aria-hidden /> : <ChevronRight className="mt-0.5 h-4 w-4 text-slate-500" aria-hidden />}
                    </div>

                    {isOpen ? (
                      <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                        <p className="text-sm text-slate-600">{e.summary}</p>
                        <div className="rounded-md border border-blue-100 bg-blue-50/80 px-3 py-2 text-sm text-blue-900">
                          <span className="font-medium">AI recommendation:</span> {e.aiRecommendation}
                        </div>
                        <p className="text-xs text-slate-500">Status: {e.status.replace(/_/g, " ")} · Risk {e.riskScore}/100</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {dateGroups.length === 0 ? <div className="py-12 text-center text-sm text-slate-500">No events match the current filters.</div> : null}
      </div>
    </div>
  );
}

