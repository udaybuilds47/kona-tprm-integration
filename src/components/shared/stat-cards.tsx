import { commandCenterStats, riskDomains } from "@/lib/mock-data/core";

export function TopStats() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {commandCenterStats.map((stat) => (
        <div key={stat.label} className="kona-kpi p-4">
          <p className="text-xs uppercase text-slate-500">{stat.label}</p>
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-xs text-blue-600">{stat.delta}</p>
        </div>
      ))}
    </div>
  );
}

export function RiskDomainCards() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
      {riskDomains.map((domain) => (
        <div key={domain.name} className="kona-card p-3">
          <p className="text-sm text-slate-600">{domain.name}</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-semibold">{domain.score}</p>
            <p className="text-xs text-slate-500">/100</p>
          </div>
          <div className="mt-2 h-1.5 rounded bg-slate-100">
            <div className="h-1.5 rounded bg-blue-500" style={{ width: `${domain.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
