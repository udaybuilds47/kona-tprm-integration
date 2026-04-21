"use client";

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { riskDistribution, timeline } from "@/lib/mock-data/core";

const colors = ["#ef4444", "#f59e0b", "#22c55e"];

export function RiskDistributionChart() {
  if (typeof window === "undefined") {
    return (
      <div className="kona-card p-4 h-[280px]">
        <p className="mb-3 font-semibold">Risk Distribution</p>
        <div className="h-[220px] rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="kona-card p-4 h-[280px]">
      <p className="mb-3 font-semibold">Risk Distribution</p>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85}>
              {riskDistribution.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RiskTrendChart() {
  if (typeof window === "undefined") {
    return (
      <div className="kona-card p-4 h-[280px]">
        <p className="mb-3 font-semibold">Real-Time Risk Monitor</p>
        <div className="h-[220px] rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="kona-card p-4 h-[280px]">
      <p className="mb-3 font-semibold">Real-Time Risk Monitor</p>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeline}>
            <Line type="monotone" dataKey="risk" stroke="#2563eb" strokeWidth={2.5} dot={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
