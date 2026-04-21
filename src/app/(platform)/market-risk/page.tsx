import Link from "next/link";

export default function MarketRiskPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Macro and logistics signals complement vendor risk. Retail scenarios overlap with the{" "}
        <Link href="/verticals/retail" className="font-medium text-blue-700 underline-offset-2 hover:underline">
          Retail vertical
        </Link>
        .
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Supply chain alerts</p>
          <p className="text-3xl font-bold text-slate-900">14</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Weather impact regions</p>
          <p className="text-3xl font-bold text-slate-900">6</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Commodity volatility</p>
          <p className="text-3xl font-bold text-slate-900">22</p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        Correlates macro volatility and disruption signals with vendor criticality and spend concentration.
      </div>
    </div>
  );
}
