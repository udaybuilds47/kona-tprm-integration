"use client";

import { useRouter } from "next/navigation";
import { navItems } from "@/lib/mock-data/core";

type Props = {
  pathname: string;
};

function selectValueForPath(pathname: string): string {
  const exact = navItems.find((i) => i.href === pathname);
  if (exact) return exact.href;
  if (pathname.startsWith("/vendors/")) return "/vendors";
  return "/";
}

export function MobileNav({ pathname }: Props) {
  const router = useRouter();
  const selectValue = selectValueForPath(pathname);

  return (
    <div className="flex items-center gap-2 border-b border-slate-200 bg-[var(--bg)] px-3 py-2 lg:hidden">
      <span className="shrink-0 text-sm font-bold text-slate-800">ARIA</span>
      <label htmlFor="mobile-route" className="sr-only">
        Jump to section
      </label>
      <select
        id="mobile-route"
        value={selectValue}
        onChange={(e) => router.push(e.target.value)}
        className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {navItems.map((item) => (
          <option key={item.href} value={item.href}>
            {item.label} (P{item.phase})
          </option>
        ))}
      </select>
    </div>
  );
}
