import type { InsightResponse, Vendor } from "@/lib/types";

export type NavItem = { label: string; href: string; phase: 1 | 2 };

export const navItems: NavItem[] = [
  { label: "Command Center", href: "/", phase: 1 },
  { label: "ARIA Intelligence", href: "/intelligence", phase: 1 },
  { label: "Success Metrics", href: "/kpis", phase: 1 },
  { label: "Case Management", href: "/cases", phase: 1 },
  { label: "Rule Architect", href: "/rules", phase: 1 },
  { label: "Continuous Monitoring", href: "/monitoring/timeline", phase: 1 },
  { label: "Alerts & Insights", href: "/alerts", phase: 1 },
  { label: "Vendor Intelligence", href: "/vendors", phase: 1 },
  { label: "Agent Actions", href: "/actions", phase: 2 },
  { label: "Cyber Sentinel", href: "/cyber", phase: 2 },
  { label: "Fraud Guardian", href: "/fraud", phase: 1 },
  { label: "External Risk Signals", href: "/external-risk", phase: 1 },
  { label: "RegTech & Compliance", href: "/regtech", phase: 1 },
  { label: "Market Risk", href: "/market-risk", phase: 1 },
  { label: "Banking Vertical", href: "/verticals/banking", phase: 2 },
  { label: "Retail Vertical", href: "/verticals/retail", phase: 2 },
];

export const activeAgents = [
  { name: "Risk Architect", rules: 48, triggers: 16, online: true },
  { name: "Cyber Guardian", rules: 3, triggers: 49, online: true },
  { name: "Fraud Detector", rules: 29, triggers: 948, online: true },
  { name: "Compliance Bot", rules: 5, triggers: 40, online: false },
  { name: "Market Risk Analyzer", rules: 10, triggers: 72, online: false },
  { name: "ESG Monitor", rules: 4, triggers: 20, online: false },
  { name: "HSE Sentinel", rules: 8, triggers: 24, online: false },
  { name: "Reputation Tracker", rules: 9, triggers: 60, online: false },
];

export const commandCenterStats = [
  { label: "Threats Blocked", value: "247", delta: "+12 today" },
  { label: "Rules Triggered", value: "1,842", delta: "+156 today" },
  { label: "Anomalies Detected", value: "23", delta: "-5 today" },
  { label: "Vendors Monitored", value: "156", delta: "+3 today" },
];

export const riskDomains = [
  { name: "Cyber", score: 78 },
  { name: "Vendor", score: 82 },
  { name: "Compliance", score: 87 },
  { name: "Financial", score: 71 },
  { name: "Fraud", score: 65 },
  { name: "HSE", score: 94 },
  { name: "ESG", score: 72 },
  { name: "Reputation", score: 68 },
];

export const riskDistribution = [
  { name: "High", value: 23 },
  { name: "Medium", value: 45 },
  { name: "Low", value: 88 },
];

export const timeline = [
  { hour: "00", risk: 46 },
  { hour: "04", risk: 44 },
  { hour: "08", risk: 60 },
  { hour: "12", risk: 52 },
  { hour: "16", risk: 63 },
  { hour: "20", risk: 49 },
  { hour: "24", risk: 54 },
];

export const teKpis = [
  { metric: "Employee Hits", hit: 2197, total: 2207, pct: 99.55 },
  { metric: "Approver Hits", hit: 553, total: 554, pct: 99.82 },
  { metric: "Transaction Hits", hit: 47530, total: 53000, pct: 89.68 },
  { metric: "Transaction Amount", hit: 3570000, total: 3760000, pct: 94.31 },
];

export const p2pKpis = [
  { metric: "Vendors", hit: 10820, total: 10821, pct: 99.99 },
  { metric: "Hit Payment", hit: 163760, total: 169910, pct: 96.38 },
  { metric: "Payment Amount", hit: 707350000, total: 712360000, pct: 99.3 },
];

export const cases = [
  {
    id: "CASE-2026-0010",
    title: "Cyber Risk Assessment: Abernathy, Schoen and Thiel",
    status: "Open",
    priority: "Medium",
    source: "Cyber Guardian",
    assignee: "Unassigned",
    dueDate: "-",
  },
  {
    id: "CASE-2026-0009",
    title: "Fraud Investigation: Invoice 6000017228",
    status: "In Progress",
    priority: "Medium",
    source: "Fraud Detector",
    assignee: "Unassigned",
    dueDate: "4/8/2026",
  },
  {
    id: "CASE-2026-0008",
    title: "Fraud Investigation: Invoice 1200134483",
    status: "In Progress",
    priority: "Medium",
    source: "Fraud Detector",
    assignee: "Unassigned",
    dueDate: "4/5/2026",
  },
];

export const rules = [
  {
    id: "RULE-001",
    title: "Benford's Law Anomaly Detection for Vendor Material Amounts",
    desc: "Calculates the first digit distribution of invoice item amounts by vendor.",
    severity: "high",
    triggers: 12,
    status: "Active",
    date: "Mar 14, 2026",
  },
  {
    id: "RULE-002",
    title: "Negative or Zero PO Net Price",
    desc: "Flag POs where net price is zero or negative.",
    severity: "medium",
    triggers: 8,
    status: "Active",
    date: "Mar 9, 2026",
  },
  {
    id: "RULE-003",
    title: "Vendor Cybersecurity Supply Chain Exposure",
    desc: "Identify vendors with potential cybersecurity supply chain exposure.",
    severity: "high",
    triggers: 3,
    status: "Inactive",
    date: "Mar 7, 2026",
  },
  {
    id: "RULE-004",
    title: "Vendor_PO_Value_Anomaly",
    desc: "Detect purchase orders where value deviates from vendor baseline.",
    severity: "high",
    triggers: 6,
    status: "Active",
    date: "Mar 6, 2026",
  },
];

export const alerts = [
  {
    id: "ALT-1",
    title: "High Risk Vendor Alert",
    desc: "TechCorp Solutions risk score increased to 85. Immediate review recommended.",
    category: "Vendor",
    time: "1/26/24, 4:30 AM",
    aiControl: "Recommend SOC 2 Type II control review and payment threshold lock.",
  },
  {
    id: "ALT-2",
    title: "Potential Fraud Detected",
    desc: "Unusual expense pattern detected for employee John Smith.",
    category: "Fraud",
    time: "1/26/24, 3:15 AM",
    aiControl: "Trigger duplicate-receipt forensic check and manager attestation.",
  },
  {
    id: "ALT-3",
    title: "Compliance Deadline Approaching",
    desc: "CloudFirst compliance certification expires in 7 days.",
    category: "Compliance",
    time: "1/26/24, 2:05 AM",
    aiControl: "Issue DD evidence request and suspend high-risk workflows until renewal.",
  },
];

export const vendors: Vendor[] = [
  {
    id: "v-techcorp",
    name: "TechCorp Solutions",
    tier: "Critical",
    riskScore: 85,
    transactionVolume: "$12.4M",
    compliance: "SOC2 expiring",
    cyberScore: 61,
    lastReviewed: "2026-04-10",
    pendingInvoices: 14,
  },
  {
    id: "v-cloudfirst",
    name: "CloudFirst Technologies",
    tier: "High",
    riskScore: 78,
    transactionVolume: "$8.1M",
    compliance: "ISO 27001",
    cyberScore: 72,
    lastReviewed: "2026-04-09",
    pendingInvoices: 6,
  },
  {
    id: "v-precision",
    name: "Precision Parts LLC",
    tier: "Medium",
    riskScore: 56,
    transactionVolume: "$3.7M",
    compliance: "Compliant",
    cyberScore: 81,
    lastReviewed: "2026-04-02",
    pendingInvoices: 0,
  },
];

/** O2C / order-to-cash KPIs (mock) */
export const o2cKpis = [
  { metric: "Open AR Items", hit: 8420, total: 9000, pct: 93.56 },
  { metric: "Dunning Queue", hit: 312, total: 400, pct: 78.0 },
  { metric: "Billing Exceptions", hit: 28, total: 120, pct: 23.33 },
  { metric: "Cash App Match Rate", hit: 98100, total: 100000, pct: 98.1 },
];

/** Rows/cols for risk heat map (region × process) */
export const o2cHeatMap = {
  rowLabels: ["Order Entry", "Fulfillment", "Billing", "Collections", "Cash App"],
  colLabels: ["NA", "EMEA", "APAC", "LATAM"],
  /** 0–1 risk intensity */
  values: [
    [0.22, 0.35, 0.41, 0.28],
    [0.18, 0.31, 0.27, 0.33],
    [0.44, 0.52, 0.48, 0.39],
    [0.36, 0.29, 0.51, 0.45],
    [0.15, 0.21, 0.19, 0.24],
  ],
};

export const demoProgramKpis = [
  {
    id: "dd-time",
    label: "Phase 1 — DD review closure time",
    delta: "−28%",
    detail: "End-to-end vendor Due Diligence vs. baseline (rolling 30d)",
    trend: "up" as const,
  },
  {
    id: "fp-rate",
    label: "Phase 1 — AI control recommendations (false positives)",
    delta: "4.2%",
    detail: "False-positive rate on AI-recommended control reviews",
    trend: "flat" as const,
  },
  {
    id: "rule-sim",
    label: "Phase 1 — Rule Architect dry-run accuracy",
    delta: "91% match",
    detail: "Simulation vs. analyst validation on historical CAMS data",
    trend: "up" as const,
  },
  {
    id: "p2-actions",
    label: "Phase 2 — Automated remediation (pilot)",
    delta: "37 / 24h",
    detail: "Volume of HITL-triggered remediation actions",
    trend: "up" as const,
  },
];

export const actionLog = [
  {
    id: "ACT-1001",
    intent: "Freeze payments to TechCorp Solutions pending cyber review",
    status: "Awaiting Approval",
    impact: "High",
    timestamp: "2026-04-13 20:44",
  },
  {
    id: "ACT-1002",
    intent: "Auto-create DD review for CloudFirst compliance expiry",
    status: "Executed",
    impact: "Medium",
    timestamp: "2026-04-13 18:22",
  },
];

export const cyberTelemetry = [
  {
    vendor: "TechCorp Solutions",
    bitsight: 610,
    securityScorecard: 64,
    businessCriticality: "Critical",
    siemSeverity: "High",
    siemSource: "Splunk ES",
  },
  {
    vendor: "CloudFirst Technologies",
    bitsight: 690,
    securityScorecard: 72,
    businessCriticality: "High",
    siemSeverity: "Medium",
    siemSource: "Microsoft Sentinel",
  },
  {
    vendor: "Precision Parts LLC",
    bitsight: 760,
    securityScorecard: 81,
    businessCriticality: "Medium",
    siemSeverity: "Low",
    siemSource: "Splunk ES",
  },
];

export const ariaPromptChips = [
  "Command Center",
  "Rule Architect",
  "Case Management",
  "Agent Actions",
  "Vendor Intelligence",
  "Cyber Sentinel",
  "HSE Risk",
  "Alerts",
  "Compliance & Risk Automation",
  "AI Document Verification",
  "Third Party Risk Management",
  "Vendor Cost Compliance",
  "Retail Operations Insights",
  "Claims Risk Intelligence",
  "Warranty Intelligence",
  "O2C order to cash",
  "risk heat map O2C",
  "high-risk third-party vendors with pending invoices",
];

const highRiskVendorRows = vendors.map((v) => ({
  name: v.name,
  tier: v.tier,
  riskScore: v.riskScore,
  pendingInvoices: v.pendingInvoices,
  transactionVolume: v.transactionVolume,
  compliance: v.compliance,
  cyberScore: v.cyberScore,
}));

const o2cInsightResponse: InsightResponse = {
  text: "I mapped your request to legacy O2C (order-to-cash) KPIs: billing, collections, and cash application with regional risk heat.",
  widgets: [
    { id: "o2c-kpi", type: "kpi-cards", title: "O2C Process KPIs", payload: { rows: o2cKpis } },
    { id: "o2c-heat", type: "heat-map", title: "O2C Process × Region Risk Heat", payload: o2cHeatMap },
  ],
};

export const insightQueryMap: Record<string, InsightResponse> = {
  "t&e expense": {
    text: "I mapped your request to legacy T&E visualization. Here are employee/approver/transaction hit-rates, geographic spread, and time-series anomalies.",
    widgets: [
      { id: "te-kpi", type: "kpi-cards", title: "T&E Expense KPI Hits", payload: { rows: teKpis } },
      { id: "te-trend", type: "line-chart", title: "Expense Timeline", payload: { rows: timeline } },
    ],
  },
  "p2p payment": {
    text: "I generated the equivalent of the legacy P2P payments visualization with hit-rates and trend acceleration.",
    widgets: [
      { id: "p2p-kpi", type: "kpi-cards", title: "P2P Payment KPI Hits", payload: { rows: p2pKpis } },
      { id: "p2p-donut", type: "donut-chart", title: "Country Risk Distribution", payload: { rows: riskDistribution } },
    ],
  },
  "o2c order": o2cInsightResponse,
  "order to cash": o2cInsightResponse,
  "risk heat map": {
    text: "O2C risk heat map: intensity reflects exception rate and aging exposure by region and subprocess.",
    widgets: [{ id: "o2c-heat-only", type: "heat-map", title: "O2C Process × Region Risk Heat", payload: o2cHeatMap }],
  },
  "high-risk third-party vendors": {
    text: "I found high-risk third-party vendors with pending compliance or cyber conditions — including open P2P/AP invoices pending match or approval.",
    widgets: [
      {
        id: "vendors",
        type: "data-table",
        title: "High-Risk Vendors (with pending invoices)",
        payload: { rows: highRiskVendorRows },
      },
    ],
    actions: [{ label: "Freeze payments for Critical tier vendors", risk: "High" }],
  },
};
