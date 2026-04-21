"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Plus, Search } from "lucide-react";
import type { MonitoringEvent, MonitoringSeverity, MonitoringStatus } from "@/lib/types";
import { useMonitoringStore, categoryLabel, severityOrder } from "@/stores/monitoring-store";
import { vendors } from "@/lib/mock-data/core";

export default function AlertsPage() {
  const { events, updateEventStatus } = useMonitoringStore();
  const [severity, setSeverity] = useState<MonitoringSeverity | "all">("all");
  const [status, setStatus] = useState<MonitoringStatus | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"date" | "severity">("date");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const vendorName = useMemo(() => new Map(vendors.map((v) => [v.id, v.name] as const)), []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (severity !== "all" && e.severity !== severity) return false;
      if (status !== "all" && e.status !== status) return false;
      if (q.trim()) {
        const s = q.trim().toLowerCase();
        const vn = vendorName.get(e.vendorId)?.toLowerCase() ?? "";
        if (!e.headline.toLowerCase().includes(s) && !vn.includes(s)) return false;
      }
      return true;
    });
  }, [events, q, severity, status, vendorName]);

  const sorted = useMemo(() => {
    const d = dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sort === "severity") return (severityOrder(a.severity) - severityOrder(b.severity)) * d;
      return (new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()) * d;
    });
  }, [filtered, sort, dir]);

  const stats = useMemo(() => {
    const total = events.length;
    const criticalHigh = events.filter((e) => e.severity === "critical" || e.severity === "high").length;
    const pending = events.filter((e) => e.status === "new").length;
    const resolved = events.filter((e) => e.status === "resolved").length;
    return { total, criticalHigh, pending, resolved };
  }, [events]);

  function toggleSort(next: "date" | "severity") {
    if (sort === next) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSort(next);
      setDir("desc");
    }
  }

  function severityPill(sev: MonitoringSeverity): string {
    if (sev === "critical") return "bg-rose-100 text-rose-800";
    if (sev === "high") return "bg-orange-100 text-orange-800";
    if (sev === "medium") return "bg-amber-100 text-amber-800";
    return "bg-emerald-100 text-emerald-800";
  }

  function statusPill(st: MonitoringStatus): string {
    switch (st) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "triaging":
        return "bg-slate-100 text-slate-700";
      case "evidence_requested":
        return "bg-amber-100 text-amber-800";
      case "evidence_received":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-emerald-100 text-emerald-800";
    }
  }

  function StatusSelect({ event }: { event: MonitoringEvent }) {
    return (
      <select
        value={event.status}
        onChange={(e) => updateEventStatus(event.id, e.target.value as MonitoringStatus)}
        className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Update alert status"
      >
        <option value="new">New</option>
        <option value="triaging">Triaging</option>
        <option value="evidence_requested">Evidence requested</option>
        <option value="evidence_received">Evidence received</option>
        <option value="resolved">Resolved</option>
      </select>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700">
        <span className="font-medium">Continuous monitoring → Alert Queue.</span> This queue is fed by External Risk Signals and rolls into Vendor DD.
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Total alerts</p>
          <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Critical / high</p>
          <p className="text-3xl font-bold text-slate-900">{stats.criticalHigh}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Pending triage</p>
          <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Resolved</p>
          <p className="text-3xl font-bold text-slate-900">{stats.resolved}</p>
        </div>
      </div>

      <div className="kona-card p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="Search headlines or vendors…"
            />
          </div>

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as typeof severity)}
            className="rounded-md border border-slate-200 bg-white px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="all">All severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="rounded-md border border-slate-200 bg-white px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="triaging">Triaging</option>
            <option value="evidence_requested">Evidence requested</option>
            <option value="evidence_received">Evidence received</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            type="button"
            onClick={() => toggleSort("severity")}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Sort by severity"
          >
            <ArrowUpDown className="h-4 w-4" aria-hidden />
            Severity
          </button>
          <button
            type="button"
            onClick={() => toggleSort("date")}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Sort by date"
          >
            <ArrowUpDown className="h-4 w-4" aria-hidden />
            Date
          </button>

          <Link
            href="/monitoring/timeline"
            className="ml-auto inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" aria-hidden />
            View timeline
          </Link>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="kona-card p-8 text-center text-sm text-slate-500">No alerts match the current filters.</div>
      ) : (
        <div className="kona-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Headline</th>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Published</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${severityPill(e.severity)}`}>{e.severity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{e.headline}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">{e.summary}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Match {e.matchConfidence}% · Risk {e.riskScore}/100
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/vendors/${e.vendorId}`}
                        className="font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                      >
                        {vendorName.get(e.vendorId) ?? e.vendorId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{categoryLabel(e.category)}</td>
                    <td className="px-4 py-3 text-slate-700">{e.source.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600">{new Date(e.publishedAt).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`mr-2 rounded-full px-2 py-1 text-xs font-medium ${statusPill(e.status)}`}>{e.status.replace(/_/g, " ")}</span>
                      <StatusSelect event={e} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/vendors/${e.vendorId}`}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Open DD hub
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
