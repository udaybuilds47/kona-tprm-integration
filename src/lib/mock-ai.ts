import { insightQueryMap } from "@/lib/mock-data/core";
import { applyInsightRbac } from "@/lib/rbac";
import type { InsightResponse, LicensedVertical, Role } from "@/lib/types";

const fallback: InsightResponse = {
  text: "I couldn't map that question to a demo view yet. Try asking about T&E, P2P, O2C, vendor risk, heat map, or alerts.",
  widgets: [],
};

export function generateInsight(query: string, role: Role, vertical: LicensedVertical): InsightResponse {
  const q = query.toLowerCase();
  const match = Object.entries(insightQueryMap).find(([key]) => q.includes(key));
  let base: InsightResponse = match ? structuredClone(match[1]) : { ...fallback };

  if (vertical === "banking") {
    base = {
      ...base,
      text: `${base.text} Licensed vertical: Banking — AML/KYC/sanctions weighting applied to rankings.`,
    };
  } else if (vertical === "retail") {
    base = {
      ...base,
      text: `${base.text} Licensed vertical: Retail — supply chain & PCI emphasis in risk scoring.`,
    };
  }

  return applyInsightRbac(role, base);
}

export function parseRuleFromNaturalLanguage(text: string) {
  const normalized = text.toLowerCase();
  const thresholdMatch = normalized.match(/\$?(\d+[\d,]*)/);

  return {
    name: text.slice(0, 80) || "Untitled rule",
    condition: normalized.includes("missing")
      ? "missing_dependency"
      : normalized.includes("over")
        ? "threshold_breach"
        : "pattern_anomaly",
    threshold: thresholdMatch ? Number(thresholdMatch[1].replace(/,/g, "")) : 10000,
    projectedMatches: 43,
    projectedFalsePositiveRate: 4.8,
  };
}
