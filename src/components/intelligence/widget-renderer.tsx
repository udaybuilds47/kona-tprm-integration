"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis } from "recharts";
import type { WidgetConfig } from "@/lib/types";

const donutColors = ["#2563eb", "#f59e0b", "#22c55e", "#ef4444"];

type Row = Record<string, string | number | boolean | null | undefined>;

function asRows(payload: Record<string, unknown>): Row[] {
  return (payload.rows as Row[]) ?? [];
}

export function WidgetRenderer({ widget }: { widget: WidgetConfig }) {
  const rows = asRows(widget.payload);
  const isServer = typeof window === "undefined";

  return (
    <div className="kona-card p-4">
      <h3 className="font-semibold mb-3">{widget.title}</h3>

      {widget.type === "kpi-cards" &&
        (rows.length === 0 ? (
          <p className="text-sm text-slate-500">No KPI rows for this widget (demo).</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {rows.map((row, idx) => (
              <div key={idx} className="kona-kpi p-3">
                <p className="text-xs text-slate-500">{String(row.metric ?? row.name ?? `Metric ${idx + 1}`)}</p>
                <p className="text-2xl font-bold">{String(row.hit ?? row.value ?? "-")}</p>
                {typeof row.total !== "undefined" ? <p className="text-xs text-slate-500">Total: {String(row.total)}</p> : null}
                {typeof row.pct !== "undefined" ? <p className="text-xs text-blue-700">{String(row.pct)}%</p> : null}
              </div>
            ))}
          </div>
        ))}

      {widget.type === "data-table" && (
        <div className="overflow-auto">
          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">No rows returned for this view (demo).</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {Object.keys(rows[0] ?? {}).map((key) => (
                    <th key={key} className="px-2 py-2 pr-3">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="px-2 py-2 pr-3">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {widget.type === "donut-chart" && (
        <div className="h-[260px]">
          {isServer ? (
            <div className="h-full rounded bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rows} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85}>
                  {rows.map((row, idx) => (
                    <Cell key={String(row.name ?? idx)} fill={donutColors[idx % donutColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {widget.type === "line-chart" && (
        <div className="h-[260px]">
          {isServer ? (
            <div className="h-full rounded bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rows}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {widget.type === "bar-chart" && (
        <div className="h-[260px]">
          {isServer ? (
            <div className="h-full rounded bg-slate-100" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {widget.type === "heat-map" && <HeatMapView payload={widget.payload} />}
    </div>
  );
}

function heatColor(t: number): string {
  const x = Math.max(0, Math.min(1, t));
  const r = Math.round(34 + (220 - 34) * x);
  const g = Math.round(197 + (71 - 197) * x);
  const b = Math.round(94 + (60 - 94) * x);
  return `rgb(${r},${g},${b})`;
}

function HeatMapView({ payload }: { payload: Record<string, unknown> }) {
  const rowLabels = (payload.rowLabels as string[]) ?? [];
  const colLabels = (payload.colLabels as string[]) ?? [];
  const values = (payload.values as number[][]) ?? [];

  return (
    <div className="overflow-auto">
      <table className="w-full min-w-[480px] border-collapse text-xs">
        <thead>
          <tr>
            <th className="border border-slate-200 bg-slate-50 p-2 text-left font-medium text-slate-600">Process / Region</th>
            {colLabels.map((c) => (
              <th key={c} className="border border-slate-200 bg-slate-50 p-2 font-medium text-slate-600">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((row, ri) => (
            <tr key={row}>
              <td className="border border-slate-200 bg-slate-50 p-2 font-medium text-slate-700">{row}</td>
              {colLabels.map((_, ci) => {
                const v = values[ri]?.[ci] ?? 0;
                return (
                  <td
                    key={`${row}-${ci}`}
                    className="border border-slate-200 p-2 text-center font-semibold text-white"
                    style={{ backgroundColor: heatColor(v) }}
                    title={`Risk intensity ${(v * 100).toFixed(0)}%`}
                  >
                    {(v * 100).toFixed(0)}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-slate-500">Intensity reflects mock exception rate and aging exposure (0–100%).</p>
    </div>
  );
}
