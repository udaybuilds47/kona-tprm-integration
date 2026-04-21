export type Role = "Risk Administrator" | "Customer Success" | "Risk Analyst";

export type LicensedVertical = "general" | "banking" | "retail";

export type WidgetType =
  | "kpi-cards"
  | "data-table"
  | "bar-chart"
  | "line-chart"
  | "donut-chart"
  | "heat-map"
  | "world-map"
  | "stratification-table"
  | "progress-bars";

export type WidgetConfig = {
  id: string;
  type: WidgetType;
  title: string;
  payload: Record<string, unknown>;
};

export type InsightResponse = {
  text: string;
  widgets: WidgetConfig[];
  actions?: { label: string; risk: "Low" | "Medium" | "High" }[];
};

export type Vendor = {
  id: string;
  name: string;
  tier: "Critical" | "High" | "Medium" | "Low";
  riskScore: number;
  transactionVolume: string;
  compliance: string;
  cyberScore: number;
  lastReviewed: string;
  /** Open P2P/AP invoices pending match or approval */
  pendingInvoices: number;
};

export type MonitoringSeverity = "critical" | "high" | "medium" | "low";
export type MonitoringCategory = "negative_news" | "watchlist" | "financial_health" | "compliance";
export type MonitoringStatus = "new" | "triaging" | "evidence_requested" | "evidence_received" | "resolved";

export type MonitoringSource = {
  id: string;
  name: string;
  type: "news" | "watchlist" | "financial";
};

export type MonitoringEvent = {
  id: string;
  vendorId: string;
  headline: string;
  summary: string;
  category: MonitoringCategory;
  severity: MonitoringSeverity;
  status: MonitoringStatus;
  publishedAt: string; // ISO
  riskScore: number; // 0-100
  matchConfidence: number; // 0-100
  source: MonitoringSource;
  aiRecommendation: string;
};
