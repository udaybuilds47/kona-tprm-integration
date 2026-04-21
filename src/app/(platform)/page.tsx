import Link from "next/link";
import { TopStats, RiskDomainCards } from "@/components/shared/stat-cards";
import { RiskDistributionChart, RiskTrendChart } from "@/components/dashboard/charts";

const shortcuts = [
  { href: "/intelligence", label: "ARIA Intelligence", hint: "NL → widgets" },
  { href: "/vendors", label: "Vendors & DD", hint: "Due diligence hub" },
  { href: "/kpis", label: "Success metrics", hint: "Rollout KPIs" },
  { href: "/rules", label: "Rule Architect", hint: "CS · dry-run" },
] as const;

export default function CommandCenterPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Operational snapshot for the Ariia command center. Use the shortcuts below for the core KonaAI demo paths.
      </p>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {shortcuts.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="kona-card group p-4 transition hover:border-blue-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <p className="font-semibold text-slate-900 group-hover:text-blue-800">{s.label}</p>
            <p className="mt-1 text-xs text-slate-500">{s.hint}</p>
          </Link>
        ))}
      </div>

      <TopStats />
      <RiskDomainCards />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="kona-card p-4 xl:col-span-2 md:p-5">
          <h2 className="font-semibold text-slate-900">Cases</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-slate-500">Total</p>
              <p className="text-3xl font-bold text-slate-900">10</p>
            </div>
            <div>
              <p className="text-slate-500">Open</p>
              <p className="text-3xl font-bold text-slate-900">9</p>
            </div>
            <div>
              <p className="text-slate-500">Under investigation</p>
              <p className="text-3xl font-bold text-slate-900">8</p>
            </div>
            <div>
              <p className="text-slate-500">Closed</p>
              <p className="text-3xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>
        <RiskDistributionChart />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RiskTrendChart />
        </div>
        <div className="kona-card p-4 md:p-5">
          <h2 className="font-semibold text-slate-900">Security posture</h2>
          {["MFA adoption", "Patch compliance", "Compliance rate"].map((label, index) => {
            const val = [75, 72, 80][index];
            return (
              <div key={label} className="mt-5">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-slate-700">{label}</span>
                  <span className="font-medium">{val}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${val}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
