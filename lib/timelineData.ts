export interface TimelineEvent {
  id: string;
  date: string;
  professionalTitle: string;
  professionalDescription: string;
  personalTitle: string;
  personalDescription: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "evt-001",
    date: "March 2024",
    professionalTitle: "System Initialization",
    professionalDescription:
      "Core infrastructure provisioned. Primary services bootstrapped across distributed nodes. Environment variables sealed and deployment pipeline verified against staging parity.",
    personalTitle: "Encrypted Record",
    personalDescription:
      "Awaiting decryption key for memory retrieval.",
  },
  {
    id: "evt-002",
    date: "July 2024",
    professionalTitle: "Data Ingestion Pipeline — v1.0",
    professionalDescription:
      "First stable data sync protocol established. Throughput benchmarked at 94th percentile. ETL transformations passing validation with zero critical failures across all schemas.",
    personalTitle: "Classified Memory",
    personalDescription:
      "Data redacted for public repository access.",
  },
  {
    id: "evt-003",
    date: "November 2024",
    professionalTitle: "Cross-Service Integration Audit",
    professionalDescription:
      "Full dependency graph traversal completed. Legacy endpoint deprecations flagged and scheduled. Inter-service latency reduced by 31% following async refactor and connection pool tuning.",
    personalTitle: "Temporal Data Block",
    personalDescription:
      "System requires Clearance Level 2 to view this log.",
  },
  {
    id: "evt-004",
    date: "February 2025",
    professionalTitle: "Production Release — GA",
    professionalDescription:
      "General availability milestone reached. Rollout executed via blue-green deployment with zero downtime. Monitoring dashboards nominal. SLAs met across all tier-one regions.",
    personalTitle: "Access Restricted",
    personalDescription:
      "Memory fragment sealed. Authorization token required to restore contents.",
  },
];
