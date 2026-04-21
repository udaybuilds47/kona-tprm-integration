import type { MonitoringEvent, MonitoringSource } from "@/lib/types";

const sources: MonitoringSource[] = [
  { id: "src-reuters", name: "Reuters", type: "news" },
  { id: "src-dowjones", name: "Dow Jones", type: "news" },
  { id: "src-ofac", name: "OFAC", type: "watchlist" },
  { id: "src-credit", name: "Credit Health", type: "financial" },
];

export const monitoringSources = sources;

export const initialMonitoringEvents: MonitoringEvent[] = [
  {
    id: "evt-1001",
    vendorId: "v-techcorp",
    headline: "TechCorp faces renewed scrutiny after security control lapses",
    summary: "Multiple reports cite delayed patching and incomplete control ownership updates. No confirmed breach disclosed.",
    category: "negative_news",
    severity: "high",
    status: "new",
    publishedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    riskScore: 81,
    matchConfidence: 92,
    source: sources[0],
    aiRecommendation: "Recommend SOC 2 Type II evidence request and temporary payment threshold lock for Critical-tier spend.",
  },
  {
    id: "evt-1002",
    vendorId: "v-cloudfirst",
    headline: "CloudFirst compliance certificate nearing expiration",
    summary: "Certificate expiry within 7–30 days. Request renewal evidence and verify control coverage continuity.",
    category: "compliance",
    severity: "medium",
    status: "triaging",
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    riskScore: 64,
    matchConfidence: 88,
    source: sources[1],
    aiRecommendation: "Trigger DD evidence request; suspend high-risk workflows if renewal is not received before expiry.",
  },
  {
    id: "evt-1003",
    vendorId: "v-techcorp",
    headline: "Credit outlook revised to negative for TechCorp sector peers",
    summary: "Macro signal indicates rising distress probability for similar suppliers. Monitor invoices and extend review cadence.",
    category: "financial_health",
    severity: "medium",
    status: "new",
    publishedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    riskScore: 59,
    matchConfidence: 73,
    source: sources[3],
    aiRecommendation: "Increase monitoring frequency and require updated financial disclosures for renewal cycle.",
  },
  {
    id: "evt-1004",
    vendorId: "v-precision",
    headline: "Watchlist screening: no direct matches, minor alias similarity detected",
    summary: "Low-confidence alias similarity triggered automated watchlist review. No action required unless repeated.",
    category: "watchlist",
    severity: "low",
    status: "resolved",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    riskScore: 18,
    matchConfidence: 41,
    source: sources[2],
    aiRecommendation: "Mark resolved; keep screening cadence and confirm vendor legal name normalization.",
  },
];

