import Link from "next/link";
import { vendors } from "@/lib/mock-data/core";

function tierStyle(tier: string) {
  switch (tier) {
    case "Critical":
      return "bg-rose-100 text-rose-800";
    case "High":
      return "bg-amber-100 text-amber-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-900";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function VendorsPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Third-party register with DD status. Open a row for the <strong>KonaAI Due Diligence</strong> hub and evidence flow.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Critical vendors</p>
          <p className="text-3xl font-bold text-slate-900">6</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">High risk</p>
          <p className="text-3xl font-bold text-slate-900">18</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Open DD reviews</p>
          <p className="text-3xl font-bold text-slate-900">12</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Evidence pending</p>
          <p className="text-3xl font-bold text-slate-900">9</p>
        </div>
      </div>

      <div className="kona-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <caption className="border-b border-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
              Monitored vendors
            </caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Pending inv.</th>
                <th className="px-4 py-3">Volume</th>
                <th className="px-4 py-3">Compliance</th>
                <th className="px-4 py-3">Cyber</th>
                <th className="px-4 py-3">Reviewed</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                      href={`/vendors/${v.id}`}
                    >
                      {v.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${tierStyle(v.tier)}`}>{v.tier}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">{v.riskScore}</td>
                  <td className="px-4 py-3">{v.pendingInvoices}</td>
                  <td className="px-4 py-3 text-slate-700">{v.transactionVolume}</td>
                  <td className="px-4 py-3 text-slate-600">{v.compliance}</td>
                  <td className="px-4 py-3">{v.cyberScore}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">{v.lastReviewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
