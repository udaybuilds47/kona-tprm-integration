import { cyberTelemetry } from "@/lib/mock-data/core";

function severityStyle(s: string) {
  if (s === "High") return "bg-rose-100 text-rose-800";
  if (s === "Medium") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

export default function CyberPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2.5 text-sm text-amber-950">
        <span className="font-medium">Phase 2 preview.</span> Cyber ratings, SIEM-style signals, and unified ontology — representative vendors only in
        this demo.
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Avg. BitSight</p>
          <p className="text-3xl font-bold text-slate-900">687</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Avg. SecurityScorecard</p>
          <p className="text-3xl font-bold text-slate-900">72</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Below threshold</p>
          <p className="text-3xl font-bold text-slate-900">4</p>
        </div>
      </div>

      <div className="kona-card overflow-hidden p-0">
        <div className="border-b border-slate-100 px-4 py-4 md:px-5">
          <h2 className="font-semibold text-slate-900">Telemetry &amp; SIEM ingestion</h2>
          <p className="mt-1 text-sm text-slate-600">
            Posture from rating providers plus normalized SIEM severity for correlation with financial and process risk (e.g. P2P exposure).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">BitSight</th>
                <th className="px-4 py-3">SSC</th>
                <th className="px-4 py-3">SIEM source</th>
                <th className="px-4 py-3">SIEM severity</th>
                <th className="px-4 py-3">Criticality</th>
                <th className="px-4 py-3">Ontology</th>
              </tr>
            </thead>
            <tbody>
              {cyberTelemetry.map((row) => (
                <tr key={row.vendor} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.vendor}</td>
                  <td className="px-4 py-3">{row.bitsight}</td>
                  <td className="px-4 py-3">{row.securityScorecard}</td>
                  <td className="px-4 py-3 text-slate-700">{row.siemSource}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${severityStyle(row.siemSeverity)}`}>{row.siemSeverity}</span>
                  </td>
                  <td className="px-4 py-3">{row.businessCriticality}</td>
                  <td className="px-4 py-3 text-slate-700">{row.bitsight < 650 ? "Escalated to P2P control" : "Monitor"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="kona-card p-4 md:p-5">
        <h2 className="font-semibold text-slate-900">CRO single pane (concept)</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          One executive surface for financial, process, and cyber risk — with drill-down to vendors and remediation playbooks. Full layout ships with
          Phase 2 analytics integration.
        </p>
      </div>
    </div>
  );
}
