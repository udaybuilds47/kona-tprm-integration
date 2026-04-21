"use client";

import { useMemo, useRef, useState } from "react";
import type { Vendor } from "@/lib/types";
import { FileUp } from "lucide-react";
import { useMonitoringStore, categoryLabel } from "@/stores/monitoring-store";
import type { MonitoringEvent, MonitoringStatus } from "@/lib/types";

export function VendorDdPanel({ vendor }: { vendor: Vendor }) {
  const { events, updateEventStatus, dismissEvent } = useMonitoringStore();
  const vendorEvents = useMemo(() => events.filter((e) => e.vendorId === vendor.id), [events, vendor.id]);
  const [sent, setSent] = useState<Record<string, string | null>>({});
  const [uploadHint, setUploadHint] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function approve(event: MonitoringEvent) {
    setSent((s) => ({
      ...s,
      [event.id]: `Evidence request emailed to ${vendor.name} security contact (mock). Ticket REQ-${event.id} created.`,
    }));
    updateEventStatus(event.id, "evidence_requested");
  }

  function dismiss(event: MonitoringEvent) {
    dismissEvent(event.id);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className="kona-card p-4 md:p-5">
        <h2 className="font-semibold text-slate-900">KonaAI Due Diligence hub</h2>
        <p className="mt-1 text-sm text-slate-600">
          Consolidated external signals with AI-suggested controls. Approvals trigger vendor outreach (HITL) in the full product.
        </p>
        <ul className="mt-4 space-y-3">
          {vendorEvents.map((event) => (
            <li key={event.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">{event.headline}</p>
                  <p className="mt-1 text-sm text-slate-600">{event.summary}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(event.publishedAt).toLocaleString()} · {categoryLabel(event.category)} · Source {event.source.name} · Match{" "}
                    {event.matchConfidence}%
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {event.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="mt-3 rounded-md border border-blue-100 bg-blue-50/80 px-3 py-2 text-sm text-blue-900">
                <span className="font-medium">AI recommendation:</span> {event.aiRecommendation}
              </div>

              {sent[event.id] ? (
                <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
                  {sent[event.id]}
                  </p>
                ) : (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => approve(event)}
                    className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    Approve &amp; request evidence
                  </button>
                  <button
                    type="button"
                    onClick={() => dismiss(event)}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  >
                    Dismiss
                  </button>
                  <StatusQuickSet eventId={event.id} update={updateEventStatus} />
                </div>
                )}
            </li>
          ))}
        </ul>
        {vendorEvents.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No monitoring events are attached to this vendor yet. Use <strong>External Risk Signals</strong> to simulate an inbound event.
          </p>
        ) : null}
      </section>

      <section className="kona-card p-4 md:p-5">
        <h2 className="font-semibold text-slate-900">Evidence &amp; findings</h2>
        <p className="mt-1 text-sm text-slate-600">Upload mock files to illustrate the evidence-to-summary loop.</p>

        <input ref={fileRef} type="file" className="sr-only" multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={() => setUploadHint("Files staged locally (demo — no parsing).")} />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-sm text-slate-600 transition hover:border-blue-300 hover:bg-blue-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <FileUp className="h-8 w-8 text-slate-400" aria-hidden />
          <span>
            <span className="font-medium text-slate-800">Choose files</span> or drop here (demo)
          </span>
        </button>
        {uploadHint ? (
          <p className="mt-2 text-xs text-emerald-700" role="status">
            {uploadHint}
          </p>
        ) : null}

        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/90 p-4">
          <p className="text-sm font-semibold text-blue-950">Findings summary (AI)</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-900">
            <li>SOC 2 certificate expires in 28 days.</li>
            <li>Two remediation controls are missing owner assignment.</li>
            <li>No critical evidence gaps found in financial disclosures.</li>
            <li>Cross-check: alert narratives align with submitted policies for {vendor.name}.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatusQuickSet({
  eventId,
  update,
}: {
  eventId: string;
  update: (id: string, status: MonitoringStatus) => void;
}) {
  return (
    <select
      defaultValue=""
      onChange={(e) => {
        const v = e.target.value as MonitoringStatus;
        if (!v) return;
        update(eventId, v);
        e.currentTarget.value = "";
      }}
      className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label="Quick set status"
    >
      <option value="">Set status…</option>
      <option value="triaging">Triaging</option>
      <option value="evidence_requested">Evidence requested</option>
      <option value="evidence_received">Evidence received</option>
      <option value="resolved">Resolved</option>
    </select>
  );
}
