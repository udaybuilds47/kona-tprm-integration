"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, ChevronDown, Sparkles } from "lucide-react";
import { activeAgents, navItems } from "@/lib/mock-data/core";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";
import type { LicensedVertical } from "@/lib/types";
import { MobileNav } from "@/components/layout/mobile-nav";

function PhaseBadge({ phase }: { phase: 1 | 2 }) {
  return (
    <span
      className={`ml-1.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
        phase === 1 ? "bg-emerald-500/35 text-emerald-50" : "bg-amber-500/35 text-amber-50"
      }`}
      title={phase === 1 ? "Phase 1 — read-only / HITL" : "Phase 2 — preview: execution & verticals"}
    >
      P{phase}
    </span>
  );
}

function pageTitle(pathname: string): string {
  const matched = navItems.find((item) => item.href === pathname);
  if (pathname.startsWith("/verticals")) return "Industry Verticals";
  if (pathname.startsWith("/vendors/") && pathname !== "/vendors") return "Vendor profile";
  return matched ? matched.label : "Ariia Command Center";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, vertical, setVertical } = useAuthStore();
  const { unread, markAllRead } = useNotificationStore();
  const [refreshNote, setRefreshNote] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  function onRefresh() {
    setRefreshNote(true);
    window.setTimeout(() => setRefreshNote(false), 2200);
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="hidden w-72 shrink-0 flex-col bg-[var(--sidebar)] p-3 text-blue-100 lg:flex">
        <div className="mb-3 border-b border-blue-900/60 pb-3">
          <p className="text-xl font-bold text-white">Covasant</p>
          <p className="text-xs text-blue-200">ARIA Command Center</p>
        </div>

        <div className="mb-3 rounded-md bg-blue-950/40 px-2 py-2 text-[11px] leading-snug text-blue-100/90">
          Demo map: <span className="text-emerald-200">P1</span> read-only insights &amp; DD ·{" "}
          <span className="text-amber-200">P2</span> execution / cyber / verticals (preview).
        </div>

        <div className="mb-4">
          <p className="mb-2 text-[11px] tracking-wide text-blue-300">ACTIVE AGENTS</p>
          <div className="max-h-48 space-y-1 overflow-y-auto pr-1">
            {activeAgents.map((agent) => (
              <div key={agent.name} className="rounded-md bg-[var(--sidebar-soft)] px-2 py-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-blue-50">{agent.name}</span>
                  <span className={agent.online ? "shrink-0 text-green-300" : "shrink-0 text-blue-300"}>
                    {agent.online ? "online" : "idle"}
                  </span>
                </div>
                <p className="text-[10px] text-blue-300">
                  {agent.rules} rules · {agent.triggers} triggers
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mb-2 text-[11px] tracking-wide text-blue-300">NAVIGATION</p>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sidebar)] ${
                  active ? "border border-blue-400/60 bg-blue-500/20 text-white" : "text-blue-100 hover:bg-blue-700/20"
                }`}
              >
                <span className="min-w-0 truncate">{item.label}</span>
                <PhaseBadge phase={item.phase} />
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 rounded-md bg-emerald-500/20 px-3 py-2 text-xs text-emerald-200">System Healthy · 98.55% uptime</div>
        <div className="mt-2 rounded-md bg-blue-950/50 px-3 py-2 text-xs text-blue-100">James Miller · {role}</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav pathname={pathname} />

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <header className="mb-4 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{pageTitle(pathname)}</h1>
                  <Sparkles className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                </div>
                <p className="text-sm text-slate-500">Track and manage enterprise risk lifecycle</p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[280px]">
                <button
                  type="button"
                  onClick={() => setDemoOpen((o) => !o)}
                  className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-800 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-expanded={demoOpen}
                >
                  Demo persona &amp; license
                  <ChevronDown className={`h-4 w-4 transition ${demoOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                <div
                  className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center ${demoOpen ? "flex" : "hidden"} lg:flex`}
                >
                  <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-xs text-slate-500">
                    <span>CAMS role</span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as typeof role)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <option>Risk Administrator</option>
                      <option>Customer Success</option>
                      <option>Risk Analyst</option>
                    </select>
                  </label>
                  <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-xs text-slate-500">
                    <span>Licensed vertical</span>
                    <select
                      value={vertical}
                      onChange={(e) => setVertical(e.target.value as LicensedVertical)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <option value="general">General enterprise</option>
                      <option value="banking">Banking</option>
                      <option value="retail">Retail</option>
                    </select>
                  </label>
                  <div className="flex flex-wrap items-center gap-2 sm:pt-5">
                    <button
                      type="button"
                      onClick={onRefresh}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      Refresh
                    </button>
                    <button
                      type="button"
                      title="Global search is not connected in this demo"
                      className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      disabled
                    >
                      Search…
                    </button>
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`Notifications, ${unread} unread`}
                    >
                      <Bell className="h-4 w-4" aria-hidden />
                      <span className="absolute -right-1 -top-1 min-w-[1rem] rounded-full bg-red-500 px-1 text-center text-[10px] leading-4 text-white">
                        {unread}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {refreshNote ? (
              <p className="text-xs text-emerald-700" role="status">
                View refreshed (demo — no live data fetch).
              </p>
            ) : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
