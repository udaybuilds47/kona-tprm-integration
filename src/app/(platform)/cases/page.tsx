"use client";

import { useState } from "react";
import { cases } from "@/lib/mock-data/core";

const chips = ["All Cases", "My Cases", "Unassigned", "Escalated", "Overdue"] as const;

export default function CasesPage() {
  const [filter, setFilter] = useState<(typeof chips)[number]>("All Cases");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {[
          ["Total cases", "10"],
          ["Open", "9"],
          ["In progress", "8"],
          ["Resolved", "0"],
          ["Escalated", "0"],
          ["Avg resolution", "0h"],
        ].map(([label, value]) => (
          <div key={label} className="kona-kpi p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="kona-card p-4 md:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Case filters">
            {chips.map((chip) => {
              const on = filter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(chip)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    on ? "border-blue-400 bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Create case
          </button>
        </div>

        <p className="mb-3 text-xs text-slate-500">
          Showing queue for <strong>{filter}</strong> (demo — filters do not change rows yet).
        </p>

        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">Case management queue</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3">Case ID</th>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Source</th>
                <th className="px-3 py-3">Assigned to</th>
                <th className="px-3 py-3">Due</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-slate-600">{row.id}</td>
                  <td className="px-3 py-3 text-slate-900">{row.title}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">{row.status}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">{row.priority}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{row.source}</td>
                  <td className="px-3 py-3 text-slate-600">{row.assignee}</td>
                  <td className="px-3 py-3 text-slate-600">{row.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
