import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { demoProgramKpis } from "@/lib/mock-data/core";

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-rose-600" aria-hidden />;
  return <Minus className="h-4 w-4 text-slate-400" aria-hidden />;
}

export default function KpisPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-emerald-100 bg-emerald-50/80 px-3 py-2.5 text-sm text-emerald-950">
        <span className="font-medium">Program KPIs</span> for the KonaAI × Ariia rollout — illustrative values for steering reviews.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {demoProgramKpis.map((k) => (
          <div key={k.id} className="kona-card p-4 md:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{k.delta}</p>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500" title={`Trend: ${k.trend}`}>
                <TrendIcon trend={k.trend === "flat" ? "flat" : k.trend === "up" ? "up" : "down"} />
                {k.trend === "flat" ? "Steady" : k.trend === "up" ? "Improving" : "Watch"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{k.detail}</p>
          </div>
        ))}
      </div>

      <div className="kona-card p-4 md:p-5 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">PRD alignment</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Phase 1 efficiency: vendor Due Diligence closure time vs. baseline.</li>
          <li>Phase 1 accuracy: false positives on AI control recommendations and Rule Architect simulations.</li>
          <li>Phase 2 adoption: automated remediation volume with mandatory HITL on high-impact actions.</li>
        </ul>
      </div>
    </div>
  );
}
