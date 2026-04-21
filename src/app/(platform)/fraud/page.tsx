import Link from "next/link";

export default function FraudPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Fraud Guardian surfaces transaction anomalies and investigator queues. For scripted anomalies, open{" "}
        <Link href="/alerts" className="font-medium text-blue-700 underline-offset-2 hover:underline">
          Alerts &amp; insights
        </Link>{" "}
        or{" "}
        <Link href="/cases" className="font-medium text-blue-700 underline-offset-2 hover:underline">
          Cases
        </Link>
        .
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Fraud signals</p>
          <p className="text-3xl font-bold text-slate-900">129</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Confirmed cases</p>
          <p className="text-3xl font-bold text-slate-900">12</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Blocked amount</p>
          <p className="text-3xl font-bold text-slate-900">$3.2M</p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        Model panel placeholder: duplicate-payment clusters, vendor anomaly streams, and queue depth for investigators — wire to your fraud graph in
        production.
      </div>
    </div>
  );
}
