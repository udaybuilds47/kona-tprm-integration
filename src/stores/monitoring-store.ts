"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MonitoringCategory, MonitoringEvent, MonitoringSeverity, MonitoringStatus } from "@/lib/types";
import { initialMonitoringEvents } from "@/lib/monitoring/mock-events";

type MonitoringState = {
  events: MonitoringEvent[];
  addEvent: (event: MonitoringEvent) => void;
  updateEventStatus: (id: string, status: MonitoringStatus) => void;
  dismissEvent: (id: string) => void;
};

const seedEvents = [...initialMonitoringEvents].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const useMonitoringStore = create<MonitoringState>()(
  persist(
    (set) => ({
      events: seedEvents,
      addEvent: (event) =>
        set((s) => ({
          events: [event, ...s.events].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
        })),
      updateEventStatus: (id, status) =>
        set((s) => ({
          events: s.events.map((e) => (e.id === id ? { ...e, status } : e)),
        })),
      dismissEvent: (id) =>
        set((s) => ({
          events: s.events.filter((e) => e.id !== id),
        })),
    }),
    {
      name: "kona-monitoring-events-v1",
      partialize: (state) => ({ events: state.events }),
    },
  ),
);

export function severityOrder(sev: MonitoringSeverity): number {
  return sev === "critical" ? 0 : sev === "high" ? 1 : sev === "medium" ? 2 : 3;
}

export function categoryLabel(cat: MonitoringCategory): string {
  switch (cat) {
    case "negative_news":
      return "Negative news";
    case "financial_health":
      return "Financial health";
    case "watchlist":
      return "Watchlist";
    case "compliance":
      return "Compliance";
  }
}

