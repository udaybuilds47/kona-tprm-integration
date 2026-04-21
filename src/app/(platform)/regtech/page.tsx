import Link from "next/link";

export default function RegtechPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Regulatory controls link to operational workflows. Banking buyers should also open the{" "}
        <Link href="/verticals/banking" className="font-medium text-blue-700 underline-offset-2 hover:underline">
          Banking vertical
        </Link>{" "}
        with the Banking license selected.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Upcoming deadlines</p>
          <p className="text-3xl font-bold text-slate-900">9</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">Open findings</p>
          <p className="text-3xl font-bold text-slate-900">5</p>
        </div>
        <div className="kona-kpi p-4">
          <p className="text-xs text-slate-500">KYC backlog</p>
          <p className="text-3xl font-bold text-slate-900">18</p>
        </div>
      </div>

      <div className="kona-card p-4 text-sm leading-relaxed text-slate-600 md:p-5">
        Tracks AML/KYC/OFAC-style controls and routes findings into cases and vendor reviews.
      </div>
    </div>
  );
}
