"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { actionLog } from "@/lib/mock-data/core";

export default function ActionsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2.5 text-sm text-amber-950">
        <span className="font-medium">Phase 2 preview.</span> Actionable intents, custom agents, and mandatory HITL for freezes and suspensions. No
        production APIs in this demo.
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Automated actions (24h)</p>
          <p className="text-3xl font-bold text-slate-900">37</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Awaiting HITL</p>
          <p className="text-3xl font-bold text-slate-900">6</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Blocked (high impact)</p>
          <p className="text-3xl font-bold text-slate-900">2</p>
        </div>
      </div>

      <div className="kona-card p-4 md:p-5">
        <h2 className="font-semibold text-slate-900">Custom agent builder</h2>
        <p className="mt-1 text-sm text-slate-600">Define scope, trigger, and whether human approval is always required.</p>

        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2800);
          }}
        >
          <label className="block text-xs font-medium text-slate-500">
            Agent name
            <input
              name="agentName"
              required
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="e.g. Critical vendor payment hold"
            />
          </label>
          <label className="block text-xs font-medium text-slate-500">
            Scope
            <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <option>Vendor remediation</option>
              <option>Cyber control</option>
            </select>
          </label>
          <label className="block text-xs font-medium text-slate-500 md:col-span-2">
            Trigger condition
            <input
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder='e.g. Cyber score under 650 AND tier Critical'
            />
          </label>
          <label className="block text-xs font-medium text-slate-500 md:col-span-2">
            Approval policy
            <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <option>Mandatory HITL for all runs</option>
              <option>HITL only for high business impact</option>
              <option>Optional (not recommended)</option>
            </select>
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Save agent (demo)
            </button>
            {saved ? (
              <span className="ml-3 inline-flex items-center gap-1 text-sm text-emerald-700" role="status">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Saved locally — not persisted.
              </span>
            ) : null}
          </div>
        </form>
      </div>

      <div className="kona-card overflow-auto p-4 md:p-5">
        <h2 className="font-semibold text-slate-900">Execution audit log</h2>
        <p className="mt-1 text-sm text-slate-600">High-impact rows require explicit confirmation in production.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Recent agent actions</caption>
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-2 py-2">Action ID</th>
                <th className="px-2 py-2">Intent</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Impact</th>
                <th className="px-2 py-2">Timestamp</th>
                <th className="px-2 py-2">HITL</th>
              </tr>
            </thead>
            <tbody>
              {actionLog.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-2 py-3 font-mono text-xs">{a.id}</td>
                  <td className="px-2 py-3 text-slate-800">{a.intent}</td>
                  <td className="px-2 py-3">{a.status}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.impact === "High" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {a.impact}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3 text-slate-600">{a.timestamp}</td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
