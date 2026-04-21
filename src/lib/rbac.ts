import type { InsightResponse, Role } from "@/lib/types";

/**
 * Demo CAMS RBAC: narrows insight payloads by role. Real deployment would enforce in CAMS APIs.
 */
export function applyInsightRbac(role: Role, response: InsightResponse): InsightResponse {
  const out: InsightResponse = {
    text: response.text,
    widgets: response.widgets.map((w) => ({
      ...w,
      payload: { ...w.payload },
    })),
    actions: response.actions ? [...response.actions] : undefined,
  };

  if (role === "Risk Analyst") {
    out.actions = undefined;
    for (const w of out.widgets) {
      if (w.type === "data-table" && Array.isArray(w.payload.rows)) {
        const rows = w.payload.rows as Record<string, unknown>[];
        w.payload.rows = rows.slice(0, 2).map((row) => ({
          ...row,
          transactionVolume: "••••",
        }));
      }
    }
    out.text += " CAMS RBAC: Analyst profile — execution actions hidden; sensitive amounts masked.";
  }

  if (role === "Customer Success") {
    out.actions = undefined;
    out.text += " CAMS RBAC: CS profile — insights enabled; payment/cyber execution requires Risk Admin approval.";
  }

  return out;
}
