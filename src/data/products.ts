export interface ProductFeature {
  title: string;
  description: string;
  items?: string[];
}

export interface ProductModule {
  name: string;
  description: string;
  features: string[];
}

export interface ProductStat {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  version: string;
  status: "available" | "beta" | "development";
  category: string;
  icon: string;
  highlights: string[];
  features: ProductFeature[];
  modules: ProductModule[];
  stats: ProductStat[];
  techStack: { name: string; value: string }[];
  useCases: string[];
}

export const products: Product[] = [
  {
    slug: "nexus",
    name: "BlackSentinel Nexus",
    subtitle: "Next Generation Autonomous SIEM",
    description:
      "Autonomous security information and event management with real-time log analysis, AI-powered threat detection, and automated response capabilities.",
    version: "4.0.0",
    status: "available",
    category: "Platform",
    icon: "grid",
    highlights: [
      "AI-powered threat detection with 99.7% accuracy",
      "Real-time log ingestion from 500+ sources",
      "Automated incident response playbooks",
      "Sub-second correlation across petabytes of data",
      "Zero-touch deployment in under 30 minutes",
    ],
    features: [
      {
        title: "Autonomous Threat Detection",
        description:
          "Machine learning models trained on billions of security events to detect threats in real-time with minimal false positives.",
        items: [
          "Behavioral analytics and anomaly detection",
          "Signature-based and heuristic analysis",
          "Cross-source correlation engine",
          "Custom detection rule builder",
          "MITRE ATT&CK framework mapping",
        ],
      },
      {
        title: "Log Management & Analytics",
        description:
          "Centralized log collection, normalization, and analysis from any source across your infrastructure.",
        items: [
          "500+ pre-built source integrations",
          "Automatic log normalization and enrichment",
          "Full-text search across all logs",
          "Long-term log retention with compression",
          "Compliance-ready log archival",
        ],
      },
      {
        title: "Automated Response",
        description:
          "Intelligent playbooks that execute response actions automatically when threats are detected.",
        items: [
          "No-code playbook builder",
          "150+ pre-built response actions",
          "SOAR integration for orchestration",
          "Risk-based escalation workflows",
          "Audit trail for all automated actions",
        ],
      },
    ],
    modules: [
      {
        name: "Log Collector",
        description: "Universal log ingestion engine supporting Syslog, SNMP, API, and agent-based collection.",
        features: ["Multi-protocol support", "Auto-parsing", "Buffer management", "Encryption in transit"],
      },
      {
        name: "Correlation Engine",
        description: "Real-time event correlation across multiple data streams.",
        features: ["Pattern matching", "Temporal correlation", "Statistical analysis", "Custom rules"],
      },
      {
        name: "Detection ML",
        description: "Machine learning models for threat detection.",
        features: ["Supervised learning", "Unsupervised anomaly detection", "Model retraining", "Explainable AI"],
      },
      {
        name: "Response Orchestrator",
        description: "Automated incident response and playbook execution.",
        features: ["Playbook engine", "Integration hub", "Approval workflows", "Rollback capability"],
      },
    ],
    stats: [
      { label: "Log Sources", value: "500+" },
      { label: "Events/Second", value: "1M+" },
      { label: "Detection Accuracy", value: "99.7%" },
      { label: "Response Time", value: "<1s" },
    ],
    techStack: [
      { name: "Backend", value: "Go, Python" },
      { name: "Database", value: "ClickHouse, PostgreSQL" },
      { name: "Cache", value: "Redis Cluster" },
      { name: "Search", value: "Elasticsearch" },
      { name: "ML", value: "TensorFlow, PyTorch" },
      { name: "Deployment", value: "Kubernetes, Docker" },
    ],
    useCases: [
      "Enterprise SOC operations",
      "Compliance monitoring (PCI-DSS, HIPAA, SOX)",
      "Threat hunting and investigation",
      "Incident response automation",
      "Multi-cloud security monitoring",
    ],
  },
  {
    slug: "sentinel",
    name: "BlackSentinel Sentinel",
    subtitle: "Autonomous Digital Sovereignty Platform",
    description:
      "Complete digital sovereignty platform ensuring data protection, compliance, and autonomous security operations across your infrastructure.",
    version: "2.0.0",
    status: "available",
    category: "Platform",
    icon: "shield",
    highlights: [
      "Complete data sovereignty and ownership",
      "Zero-trust architecture enforcement",
      "Automated compliance across 50+ frameworks",
      "Self-hosted deployment option",
      "Real-time data classification and governance",
    ],
    features: [
      {
        title: "Data Sovereignty",
        description:
          "Ensure your data stays under your control with self-hosted deployment and encryption.",
        items: [
          "On-premise deployment option",
          "End-to-end encryption (AES-256-GCM)",
          "Data residency controls",
          "Zero-knowledge architecture",
          "Audit logging for all access",
        ],
      },
      {
        title: "Compliance Automation",
        description:
          "Automated compliance monitoring and reporting across major frameworks.",
        items: [
          "50+ compliance frameworks supported",
          "Continuous compliance monitoring",
          "Automated evidence collection",
          "Gap analysis and remediation",
          "Audit-ready reports",
        ],
      },
      {
        title: "Access Control",
        description:
          "Zero-trust access control with RBAC, ABAC, and MFA.",
        items: [
          "Role-based access control (RBAC)",
          "Attribute-based access control (ABAC)",
          "Multi-factor authentication (MFA)",
          "Single sign-on (SSO) integration",
          "Session management and recording",
        ],
      },
    ],
    modules: [
      {
        name: "Data Classifier",
        description: "Automatic data classification and sensitivity tagging.",
        features: ["ML-based classification", "Custom labels", "DLP integration", "Encryption suggestions"],
      },
      {
        name: "Compliance Engine",
        description: "Automated compliance monitoring and reporting.",
        features: ["Framework mapping", "Evidence collection", "Gap analysis", "Audit reports"],
      },
      {
        name: "Access Manager",
        description: "Zero-trust access control and identity management.",
        features: ["RBAC/ABAC", "MFA/SSO", "Session recording", "Privileged access"],
      },
      {
        name: "Sovereignty Dashboard",
        description: "Real-time visibility into data sovereignty posture.",
        features: ["Data mapping", "Residency tracking", "Risk scoring", "Compliance status"],
      },
    ],
    stats: [
      { label: "Compliance Frameworks", value: "50+" },
      { label: "Data Classification", value: "Automatic" },
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Zero-Trust", value: "Enforced" },
    ],
    techStack: [
      { name: "Backend", value: "Rust, Go" },
      { name: "Database", value: "PostgreSQL" },
      { name: "Encryption", value: "AES-256-GCM" },
      { name: "Auth", value: "OAuth2, SAML, OIDC" },
      { name: "Deployment", value: "Self-hosted, Cloud" },
    ],
    useCases: [
      "Data sovereignty compliance (GDPR, LGPD)",
      "Zero-trust architecture implementation",
      "Enterprise access management",
      "Regulated industries (finance, healthcare)",
      "Government and defense",
    ],
  },
  {
    slug: "strike",
    name: "BlackSentinel Strike",
    subtitle: "Offensive Security Platform",
    description:
      "Professional penetration testing suite with 24+ security modules, automated exploitation, and comprehensive reporting.",
    version: "4.0.0",
    status: "available",
    category: "Offensive Security",
    icon: "zap",
    highlights: [
      "24+ integrated security modules",
      "AES-256-CBC encrypted vault for all data",
      "131+ documented CVEs with exploitation",
      "Automated 7-stage attack pipeline",
      "6 report formats including executive summary",
    ],
    features: [
      {
        title: "War Exploit Engine",
        description: "Automated 7-stage attack pipeline for comprehensive penetration testing.",
        items: [
          "Connectivity verification (ping sweep)",
          "OS detection and fingerprinting",
          "Full port scanning and discovery",
          "Service version detection",
          "Vulnerability scanning (131+ CVEs)",
          "Automated exploitation attempts",
          "Post-exploitation data collection",
        ],
      },
      {
        title: "Network & Port Scanning",
        description: "Advanced network reconnaissance with multiple scan types.",
        items: [
          "Ping scan for host discovery",
          "SYN stealth scan",
          "TCP connect scan",
          "UDP port scan",
          "Full OS + version detection",
          "Masscan for rapid full-range scanning",
        ],
      },
      {
        title: "Web Application Testing",
        description: "Comprehensive web application security assessment.",
        items: [
          "WhatWeb fingerprinting",
          "Gobuster directory brute-force",
          "Nikto web server scanning",
          "SQLMap injection testing",
          "FFuf web fuzzing",
          "Nuclei vulnerability scanning",
        ],
      },
      {
        title: "Password Attacks",
        description: "Multi-protocol brute force and credential testing.",
        items: [
          "SSH, FTP, SMB, RDP brute force",
          "HTTP form-based attacks",
          "MySQL, PostgreSQL, MongoDB attacks",
          "Automatic wordlist selection",
          "Real-time statistics",
        ],
      },
      {
        title: "Encrypted Vault",
        description: "Military-grade encryption for all scan data and results.",
        items: [
          "AES-256-CBC encryption",
          "PBKDF2-SHA512 key derivation (1M iterations)",
          "HMAC-SHA512 authentication",
          "Random 16-byte IV per operation",
          "64-byte derived key (32 AES + 32 HMAC)",
        ],
      },
    ],
    modules: [
      { name: "War Exploit", description: "Automated attack pipeline with 7 stages.", features: ["Host discovery", "OS detection", "Port scanning", "Service detection", "Vuln scanning", "Exploitation", "Post-exploit"] },
      { name: "Network Scan", description: "Advanced network reconnaissance.", features: ["Ping sweep", "SYN scan", "TCP connect", "UDP scan", "Full scan"] },
      { name: "Port Scanner", description: "Comprehensive port scanning.", features: ["Common 1000", "Top 100/50", "Full 65535", "Masscan fast"] },
      { name: "Web Explorer", description: "Web application security testing.", features: ["WhatWeb", "Gobuster", "Nikto", "SQLMap", "FFuf", "Nuclei"] },
      { name: "Exploits", description: "Exploitation framework with 34 functions.", features: ["EternalBlue", "vsftpd", "Apache Struts", "Tomcat", "Samba"] },
      { name: "Password Attack", description: "Multi-protocol credential attacks.", features: ["Hydra integration", "SSH/FTP/SMB/RDP", "HTTP forms", "Database auth"] },
      { name: "Post-Exploit", description: "Post-exploitation data collection.", features: ["System info", "Hash dump", "Network recon", "File discovery"] },
      { name: "Forensic", description: "Digital forensics analysis.", features: ["File analysis", "Hash verification", "Log analysis", "Memory analysis"] },
      { name: "Wireless", description: "Wireless network attacks.", features: ["WPA/WEP cracking", "WPS attack", "Evil twin", "Bluetooth"] },
      { name: "Network Attacks", description: "Network-level attacks.", features: ["ARP spoofing", "DNS spoofing", "MITM", "Packet sniffing"] },
      { name: "Social Engineering", description: "Social engineering tools.", features: ["Phishing pages", "Credential harvesting", "Email spoofing"] },
      { name: "Reports", description: "Multi-format report generation.", features: ["Markdown", "JSON", "HTML", "PDF", "DOCX", "Executive"] },
    ],
    stats: [
      { label: "Security Modules", value: "24+" },
      { label: "CVEs Documented", value: "131+" },
      { label: "Functions", value: "400+" },
      { label: "Lines of Code", value: "15,000+" },
    ],
    techStack: [
      { name: "Language", value: "Python 3.11+" },
      { name: "GUI", value: "CustomTkinter" },
      { name: "Encryption", value: "AES-256-CBC" },
      { name: "Tools", value: "nmap, hydra, nikto, sqlmap" },
      { name: "Platforms", value: "macOS, Linux, Kali, Docker" },
    ],
    useCases: [
      "Authorized penetration testing",
      "Corporate security audits",
      "Red team operations",
      "Security assessment and compliance",
      "Cybersecurity training and education",
    ],
  },
  {
    slug: "pulse",
    name: "BlackSentinel Pulse",
    subtitle: "AI Autonomous Attack Surface Management",
    description:
      "AI-powered attack surface management platform that discovers, analyzes, visualizes, and remediates your entire digital footprint autonomously.",
    version: "1.0.0",
    status: "available",
    category: "Defense & Intelligence",
    icon: "activity",
    highlights: [
      "Autonomous asset discovery across cloud, on-prem, and code",
      "AI/ML risk scoring with 7 weighted factors",
      "Interactive attack path visualization with graph ML",
      "16 data models and 56 API endpoints",
      "Multi-tenant SaaS with 6 delivery models",
    ],
    features: [
      {
        title: "Asset Discovery",
        description: "Automatically discover all digital assets exposed by your organization.",
        items: [
          "Subdomain enumeration and DNS resolution",
          "Certificate Transparency monitoring",
          "Cloud asset discovery (AWS, Azure, GCP)",
          "GitHub secrets scanning",
          "SSL/TLS certificate monitoring",
          "API endpoint discovery",
        ],
      },
      {
        title: "AI Risk Scoring",
        description: "Machine learning-powered risk assessment with 7 weighted factors.",
        items: [
          "Vulnerability analysis (30% weight)",
          "Exposure assessment (25% weight)",
          "Business criticality (20% weight)",
          "Threat intelligence correlation (15% weight)",
          "Configuration audit (10% weight)",
          "Asset age factor (5% weight)",
          "Network position factor (5% weight)",
        ],
      },
      {
        title: "Attack Path Analysis",
        description: "Graph-based attack path visualization and analysis.",
        items: [
          "Neo4j-powered attack graph",
          "Blast radius calculation",
          "Path prioritization by exploitability",
          "Interactive graph visualization",
          "External-to-internal path mapping",
        ],
      },
      {
        title: "Autonomous Remediation",
        description: "Automated security fixes and policy enforcement.",
        items: [
          "Configurable auto-fix policies",
          "Jira/ServiceNow integration",
          "Slack/Teams/PagerDuty notifications",
          "Compliance template enforcement",
          "Asset quarantine capability",
        ],
      },
    ],
    modules: [
      { name: "Discovery Engines", description: "5 discovery engines for complete asset coverage.", features: ["Domain", "Network", "Cloud", "GitHub", "Certificate"] },
      { name: "ML/AI Engines", description: "3 machine learning engines for risk analysis.", features: ["Risk Scoring", "Anomaly Detection", "Attack Paths"] },
      { name: "Task Queue", description: "Async task processing with Celery.", features: ["Celery Workers", "Redis Broker", "Scheduled scans"] },
      { name: "PostgreSQL", description: "Primary data store for assets and vulnerabilities.", features: ["Assets", "Vulnerabilities", "Scans", "Alerts"] },
      { name: "Neo4j Graph", description: "Graph database for attack path analysis.", features: ["Attack graph", "Relationships", "Path finding"] },
      { name: "Redis Cache", description: "Caching and session management.", features: ["Session store", "Rate limiting", "Cache"] },
    ],
    stats: [
      { label: "Data Models", value: "16" },
      { label: "API Endpoints", value: "56" },
      { label: "Discovery Engines", value: "5" },
      { label: "ML Engines", value: "3" },
    ],
    techStack: [
      { name: "Frontend", value: "React, TypeScript, TailwindCSS" },
      { name: "Backend", value: "Python/FastAPI" },
      { name: "Database", value: "PostgreSQL, Neo4j, Redis" },
      { name: "ML", value: "scikit-learn" },
      { name: "Queue", value: "Celery" },
      { name: "Container", value: "Docker, Kubernetes" },
    ],
    useCases: [
      "External attack surface monitoring",
      "Cloud security posture management",
      "Third-party risk assessment",
      "Merger & acquisition due diligence",
      "Continuous security monitoring",
    ],
  },
  {
    slug: "guardian",
    name: "BlackSentinel Guardian",
    subtitle: "Endpoint Protection",
    description:
      "Advanced endpoint detection and response with real-time monitoring, threat hunting, and automated remediation.",
    version: "3.0.0",
    status: "available",
    category: "Defense & Intelligence",
    icon: "monitor",
    highlights: [
      "Real-time endpoint monitoring and threat detection",
      "AI-powered behavioral analysis",
      "Automated threat containment and remediation",
      "Cross-platform support (Windows, macOS, Linux)",
      "Lightweight agent with <2% CPU usage",
    ],
    features: [
      {
        title: "Endpoint Detection & Response",
        description: "Real-time monitoring and response across all endpoints.",
        items: [
          "Process monitoring and termination",
          "File integrity monitoring",
          "Registry change detection",
          "Network connection tracking",
          "Memory analysis for fileless malware",
        ],
      },
      {
        title: "Threat Hunting",
        description: "Proactive threat hunting with pre-built and custom queries.",
        items: [
          "100+ pre-built hunting queries",
          "MITRE ATT&CK mapped detections",
          "Custom query builder",
          "Threat intelligence integration",
          "Automated hunt schedules",
        ],
      },
      {
        title: "Automated Remediation",
        description: "Automatic containment and cleanup of threats.",
        items: [
          "Process isolation and termination",
          "File quarantine and deletion",
          "Network isolation",
          "Registry rollback",
          "System restore points",
        ],
      },
    ],
    modules: [
      { name: "EDR Agent", description: "Lightweight endpoint agent.", features: ["Process monitoring", "File integrity", "Registry watch", "Network tracking"] },
      { name: "Detection Engine", description: "AI-powered threat detection.", features: ["Behavioral analysis", "Signature matching", "ML models", "Custom rules"] },
      { name: "Response Console", description: "Centralized response management.", features: ["Live response", "Isolation", "Investigation", "Forensics"] },
      { name: "Hunting Workbench", description: "Proactive threat hunting.", features: ["Query library", "Custom queries", "Scheduled hunts", "Results analysis"] },
    ],
    stats: [
      { label: "Endpoint Coverage", value: "Windows, macOS, Linux" },
      { label: "CPU Usage", value: "<2%" },
      { label: "Detection Rules", value: "1000+" },
      { label: "Response Time", value: "<5s" },
    ],
    techStack: [
      { name: "Agent", value: "Rust, C++" },
      { name: "Backend", value: "Go" },
      { name: "Database", value: "TimescaleDB" },
      { name: "ML", value: "ONNX Runtime" },
      { name: "Communication", value: "gRPC" },
    ],
    useCases: [
      "Endpoint protection for enterprises",
      "Threat hunting and investigation",
      "Incident response automation",
      "Compliance monitoring",
      "Remote workforce security",
    ],
  },
  {
    slug: "vault",
    name: "BlackSentinel Vault",
    subtitle: "Secrets & Privileged Access",
    description:
      "Secrets management and privileged access management with zero trust enforcement and comprehensive audit logging.",
    version: "2.0.0",
    status: "available",
    category: "Access & Secrets",
    icon: "lock",
    highlights: [
      "Zero-trust secrets management",
      "Dynamic secrets with automatic rotation",
      "Complete audit trail for all access",
      "Integration with 50+ tools and platforms",
      "Hardware security module (HSM) support",
    ],
    features: [
      {
        title: "Secrets Management",
        description: "Secure storage and distribution of secrets across your infrastructure.",
        items: [
          "AES-256 encryption at rest",
          "Automatic secret rotation",
          "Dynamic secret generation",
          "Version control for secrets",
          "Emergency access procedures",
        ],
      },
      {
        title: "Privileged Access Management",
        description: "Control and monitor privileged access across all systems.",
        items: [
          "Just-in-time access provisioning",
          "Session recording and monitoring",
          "Multi-factor approval workflows",
          "Privilege escalation prevention",
          "Access request and approval",
        ],
      },
      {
        title: "Audit & Compliance",
        description: "Complete audit trail for all privileged operations.",
        items: [
          "Immutable audit logs",
          "Real-time alerting on suspicious access",
          "Compliance reporting (SOC2, ISO27001)",
          "Session playback",
          "Forensic investigation tools",
        ],
      },
    ],
    modules: [
      { name: "Secrets Engine", description: "Core secrets storage and distribution.", features: ["Encryption", "Rotation", "Dynamic secrets", "Versioning"] },
      { name: "PAM Console", description: "Privileged access management.", features: ["JIT access", "Session recording", "MFA approval", "Access requests"] },
      { name: "Audit Logger", description: "Comprehensive audit logging.", features: ["Immutable logs", "Real-time alerts", "Compliance reports", "Session playback"] },
      { name: "Integration Hub", description: "Connect with 50+ platforms.", features: ["AWS/Azure/GCP", "Kubernetes", "CI/CD", "Databases"] },
    ],
    stats: [
      { label: "Integrations", value: "50+" },
      { label: "Encryption", value: "AES-256" },
      { label: "Audit Log Retention", value: "Unlimited" },
      { label: "Secret Rotation", value: "Automatic" },
    ],
    techStack: [
      { name: "Backend", value: "Go" },
      { name: "Database", value: "PostgreSQL" },
      { name: "Encryption", value: "AES-256-GCM" },
      { name: "HSM", value: "PKCS#11" },
      { name: "Protocol", value: "gRPC, REST" },
    ],
    useCases: [
      "Enterprise secrets management",
      "Privileged access control",
      "Compliance (SOC2, ISO27001, PCI-DSS)",
      "DevSecOps pipeline security",
      "Zero-trust architecture",
    ],
  },
  {
    slug: "vision",
    name: "BlackSentinel Vision",
    subtitle: "Autonomous Cyber Threat Intelligence Platform",
    description:
      "Comprehensive threat intelligence platform with IOC enrichment, automated correlation, and predictive analytics.",
    version: "3.0.0",
    status: "available",
    category: "Defense & Intelligence",
    icon: "eye",
    highlights: [
      "16 integrated intelligence modules",
      "2.8M+ IOCs tracked in real-time",
      "847 threat actor profiles",
      "234 active campaigns monitored",
      "AI-powered threat prediction engine",
    ],
    features: [
      {
        title: "Global Threat Dashboard",
        description: "Real-time global threat landscape visualization.",
        items: [
          "Interactive world threat map",
          "Real-time attack visualization",
          "Regional threat activity",
          "Campaign tracking",
          "Critical CVE prioritization",
        ],
      },
      {
        title: "IOC Intelligence",
        description: "Intelligent indicator of compromise management.",
        items: [
          "9 IOC types (IPs, domains, URLs, hashes, etc.)",
          "2.8M+ IOCs tracked",
          "Automatic enrichment from 8+ sources",
          "STIX format export",
          "Correlation with campaigns and actors",
        ],
      },
      {
        title: "Threat Actor Profiling",
        description: "Comprehensive threat actor intelligence.",
        items: [
          "847 threat actor profiles",
          "APT, ransomware, hacktivist tracking",
          "MITRE ATT&CK TTP mapping",
          "Campaign correlation",
          "Capability assessment",
        ],
      },
      {
        title: "AI Correlation Engine",
        description: "AI-powered intelligence correlation and analysis.",
        items: [
          "12,847 correlations discovered",
          "342 hidden relationships found",
          "Knowledge graph visualization",
          "Predictive threat modeling",
          "Automated intelligence reports",
        ],
      },
    ],
    modules: [
      { name: "Global Dashboard", description: "Real-time threat landscape overview.", features: ["World map", "Attack visualization", "Campaign tracking", "CVE priority"] },
      { name: "Threat Feeds", description: "8-source intelligence aggregation.", features: ["AlienVault OTX", "Abuse.ch", "CISA KEV", "VirusTotal"] },
      { name: "IOC Intelligence", description: "2.8M+ IOC tracking and analysis.", features: ["9 IOC types", "Auto-enrichment", "STIX export", "Correlation"] },
      { name: "Actor Profiling", description: "847 threat actor profiles.", features: ["APT tracking", "Ransomware groups", "TTP mapping", "Campaign links"] },
      { name: "Campaign Intel", description: "234 active campaign monitoring.", features: ["Attack chain", "Actor correlation", "Sector targeting", "Confidence scoring"] },
      { name: "Vuln Intelligence", description: "45,231 CVE tracking.", features: ["CVSS scoring", "EPSS integration", "KEV tracking", "Exploit prediction"] },
      { name: "Dark Web Intel", description: "Dark web monitoring.", features: ["47 sources", "Credential leaks", "Access sales", "Forum monitoring"] },
      { name: "AI Correlation", description: "12,847 AI-powered correlations.", features: ["Knowledge graph", "Hidden relationships", "Pattern detection", "Predictive analysis"] },
      { name: "Threat Prediction", description: "AI-powered threat forecasting.", features: ["Trend analysis", "Campaign prediction", "Risk scoring", "Confidence levels"] },
      { name: "Attack Path Intel", description: "Attack path intelligence.", features: ["Step-by-step analysis", "Probability scoring", "Impact assessment", "Recommendations"] },
      { name: "MITRE ATT&CK", description: "Complete MITRE framework mapping.", features: ["14 tactics", "201 techniques", "89% coverage", "Gap analysis"] },
      { name: "Malware Intel", description: "18.2M+ malware samples.", features: ["2,341 families", "YARA rules", "Sigma rules", "Behavior analysis"] },
      { name: "AI Copilot", description: "Conversational security assistant.", features: ["Natural language", "Context-aware", "Action execution", "Report generation"] },
      { name: "Knowledge Graph", description: "Cybersecurity knowledge graph.", features: ["Entity mapping", "Relationship tracking", "Interactive viz", "Deep analysis"] },
      { name: "Digital Risk", description: "External digital risk protection.", features: ["247 assets monitored", "Typosquatting", "Brand impersonation", "Auto-takedown"] },
      { name: "Reports", description: "Automated intelligence reports.", features: ["Executive summary", "Vulnerability report", "Compliance", "Trend analysis"] },
    ],
    stats: [
      { label: "IOCs Tracked", value: "2.8M+" },
      { label: "Threat Actors", value: "847" },
      { label: "Active Campaigns", value: "234" },
      { label: "CVEs Monitored", value: "45,231" },
    ],
    techStack: [
      { name: "Frontend", value: "Next.js 16, React 19, TypeScript" },
      { name: "Styling", value: "Tailwind CSS v4" },
      { name: "State", value: "Zustand" },
      { name: "Visualization", value: "SVG, Recharts" },
      { name: "Security", value: "CSP, HSTS, Rate Limiting" },
    ],
    useCases: [
      "Security Operations Center (SOC) intelligence",
      "Threat hunting and investigation",
      "Executive risk briefings",
      "Incident response support",
      "Strategic security planning",
    ],
  },
  {
    slug: "forge",
    name: "BlackSentinel Forge",
    subtitle: "Security Automation",
    description:
      "Workflow automation for security operations with no-code playbook builder and incident response orchestration.",
    version: "2.0.0",
    status: "available",
    category: "Defense & Intelligence",
    icon: "cpu",
    highlights: [
      "No-code visual playbook builder",
      "500+ pre-built automation actions",
      "Integration with 100+ security tools",
      "Real-time workflow execution monitoring",
      "Custom connector development framework",
    ],
    features: [
      {
        title: "Playbook Builder",
        description: "Visual drag-and-drop playbook creation.",
        items: [
          "No-code visual editor",
          "500+ pre-built actions",
          "Conditional logic and branching",
          "Loop and iteration support",
          "Variable and template system",
        ],
      },
      {
        title: "Integration Hub",
        description: "Connect with 100+ security and IT tools.",
        items: [
          "SIEM integrations (Splunk, Sentinel, QRadar)",
          "EDR integrations (CrowdStrike, SentinelOne)",
          "Ticketing (Jira, ServiceNow)",
          "Communication (Slack, Teams, Email)",
          "Cloud (AWS, Azure, GCP)",
        ],
      },
      {
        title: "Execution Engine",
        description: "High-performance playbook execution.",
        items: [
          "Parallel execution support",
          "Timeout and retry handling",
          "Error recovery and rollback",
          "Execution history and logging",
          "Performance monitoring",
        ],
      },
    ],
    modules: [
      { name: "Playbook Editor", description: "Visual playbook creation.", features: ["Drag-and-drop", "500+ actions", "Conditional logic", "Templates"] },
      { name: "Integration Hub", description: "100+ tool integrations.", features: ["SIEM", "EDR", "Ticketing", "Cloud", "Communication"] },
      { name: "Execution Engine", description: "High-performance automation.", features: ["Parallel execution", "Error handling", "Retry logic", "Monitoring"] },
      { name: "Connector Framework", description: "Custom connector development.", features: ["SDK", "API wrapper", "Testing tools", "Documentation"] },
    ],
    stats: [
      { label: "Pre-built Actions", value: "500+" },
      { label: "Integrations", value: "100+" },
      { label: "Execution Speed", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    techStack: [
      { name: "Backend", value: "Node.js, TypeScript" },
      { name: "Queue", value: "RabbitMQ" },
      { name: "Database", value: "PostgreSQL" },
      { name: "Cache", value: "Redis" },
      { name: "Deployment", value: "Kubernetes" },
    ],
    useCases: [
      "Incident response automation",
      "Threat intelligence enrichment",
      "Vulnerability management workflows",
      "Compliance automation",
      "SOAR platform integration",
    ],
  },
  {
    slug: "command",
    name: "BlackSentinel Command",
    subtitle: "Unified Management Console",
    description:
      "Centralized management console providing unified visibility and control across all BlackSentinel security modules.",
    version: "2.0.0",
    status: "available",
    category: "Platform",
    icon: "terminal",
    highlights: [
      "Single pane of glass for all security operations",
      "12 integrated command modules",
      "AI-powered executive reporting",
      "Real-time global asset graph",
      "Multi-tenant enterprise management",
    ],
    features: [
      {
        title: "Executive Command Center",
        description: "CISO-level dashboard with business-aligned metrics.",
        items: [
          "Real-time security posture score",
          "Risk quantification in financial terms",
          "Compliance status overview",
          "Board-ready report generation",
          "Trend analysis and forecasting",
        ],
      },
      {
        title: "SOC Command Center",
        description: "Operational dashboard for security analysts.",
        items: [
          "Alert triage and prioritization",
          "Incident tracking and management",
          "Threat intelligence integration",
          "Analyst workload management",
          "Shift handover reports",
        ],
      },
      {
        title: "Global Asset Graph",
        description: "Interactive visualization of all assets and relationships.",
        items: [
          "Real-time asset discovery",
          "Relationship mapping",
          "Risk heatmap overlay",
          "Drill-down investigation",
          "Export and reporting",
        ],
      },
    ],
    modules: [
      { name: "Executive Center", description: "CISO dashboard.", features: ["Security posture", "Risk quantification", "Board reports", "Trends"] },
      { name: "SOC Center", description: "SOC operations.", features: ["Alert triage", "Incident mgmt", "Threat intel", "Workload"] },
      { name: "Infrastructure", description: "Infrastructure management.", features: ["Asset inventory", "Configuration", "Patching", "Monitoring"] },
      { name: "Asset Graph", description: "Global asset visualization.", features: ["Discovery", "Relationships", "Risk heatmap", "Investigation"] },
      { name: "AI Center", description: "AI-powered assistance.", features: ["Natural language", "Automated analysis", "Predictions", "Reports"] },
      { name: "Automation", description: "Workflow automation.", features: ["Playbooks", "Integrations", "Scheduling", "Monitoring"] },
      { name: "Compliance", description: "Compliance management.", features: ["Framework mapping", "Evidence", "Audit reports", "Gap analysis"] },
      { name: "Analytics", description: "Security analytics.", features: [" dashboards", "Custom reports", "Trend analysis", "Export"] },
    ],
    stats: [
      { label: "Modules", value: "12" },
      { label: "Integrations", value: "200+" },
      { label: "Concurrent Users", value: "1000+" },
      { label: "Data Retention", value: "Unlimited" },
    ],
    techStack: [
      { name: "Frontend", value: "Next.js 14, React 18, TypeScript" },
      { name: "Backend", value: "PostgreSQL, Redis, Neo4j" },
      { name: "Search", value: "Elasticsearch" },
      { name: "Streaming", value: "Kafka" },
      { name: "AI", value: "GPT-4, Custom Models" },
    ],
    useCases: [
      "Enterprise security operations",
      "Multi-site security management",
      "Executive reporting and governance",
      "SOC team coordination",
      "Compliance management",
    ],
  },
  {
    slug: "ai",
    name: "BlackSentinel AI",
    subtitle: "Cyber Cognitive Intelligence Engine",
    description:
      "Autonomous cyber cognitive intelligence engine serving as the central brain for all BlackSentinel ecosystem products.",
    version: "1.0.0",
    status: "available",
    category: "Artificial Intelligence",
    icon: "brain",
    highlights: [
      "6-layer cognitive architecture",
      "10 specialized AI agents",
      "18 core packages",
      "Autonomous threat detection and response",
      "Explainable AI (XAI) for decision transparency",
    ],
    features: [
      {
        title: "6-Layer Cognitive Architecture",
        description: "From perception to learning, a complete cognitive stack.",
        items: [
          "Perception Layer - Event ingestion and normalization",
          "Knowledge Layer - Graph-based knowledge representation",
          "Memory Layer - 8-tier hierarchical memory system",
          "Reasoning Layer - Chain-of-thought and causal inference",
          "Decision Layer - Risk-based action selection",
          "Learning Layer - Self-improvement and model retraining",
        ],
      },
      {
        title: "10 Specialized AI Agents",
        description: "Expert agents for different security domains.",
        items: [
          "SOC Agent - Alert analysis and triage",
          "Threat Hunter Agent - Proactive threat detection",
          "Incident Response Agent - Playbook generation",
          "Threat Intelligence Agent - Intel correlation",
          "Vulnerability Agent - CVE prioritization",
          "Identity Agent - Privilege analysis",
          "Endpoint Agent - Behavior analysis",
          "Cloud Agent - Configuration analysis",
          "Executive Agent - Business reporting",
          "Automation Agent - Workflow generation",
        ],
      },
      {
        title: "Security Artifact Generation",
        description: "AI-powered generation of security artifacts.",
        items: [
          "Sigma rules for SIEM detection",
          "YARA rules for malware detection",
          "Suricata rules for network IDS",
          "KQL queries for Azure Sentinel",
          "Incident response playbooks",
          "PowerShell, Bash, Python scripts",
        ],
      },
      {
        title: "Explainable AI (XAI)",
        description: "Transparent AI decisions with reasoning chains.",
        items: [
          "Decision reasoning chains",
          "Evidence tracking for audit",
          "Alternative analysis",
          "Confidence scoring",
          "Limitation awareness",
        ],
      },
    ],
    modules: [
      { name: "AI Engine", description: "Core cognitive engine.", features: ["6-layer architecture", "Model management", "Inference pipeline", "Performance monitoring"] },
      { name: "Agent Orchestrator", description: "Multi-agent system.", features: ["Task delegation", "Agent communication", "Consensus building", "Session management"] },
      { name: "Knowledge Graph", description: "Graph-based knowledge.", features: ["Entity mapping", "Relationship tracking", "BFS/DFS traversal", "Context retrieval"] },
      { name: "Memory Service", description: "8-tier memory system.", features: ["Immediate", "Operational", "Historical", "Organizational"] },
      { name: "LLM Orchestrator", description: "Multi-provider LLM routing.", features: ["GPT-4", "Claude", "Llama", "Caching"] },
      { name: "Predictive Engine", description: "Threat prediction.", features: ["Risk scoring", "Attack path modeling", "Vulnerability prediction", "Trend analysis"] },
      { name: "Generative AI", description: "Security artifact generation.", features: ["Sigma rules", "YARA rules", "Playbooks", "Scripts"] },
      { name: "XAI Module", description: "Explainable AI.", features: ["Decision chains", "Evidence tracking", "Alternatives", "Confidence"] },
    ],
    stats: [
      { label: "Cognitive Layers", value: "6" },
      { label: "AI Agents", value: "10" },
      { label: "Core Packages", value: "18" },
      { label: "API Endpoints", value: "30+" },
    ],
    techStack: [
      { name: "Runtime", value: "Node.js 18+" },
      { name: "Language", value: "TypeScript 5.3" },
      { name: "Framework", value: "Express.js" },
      { name: "Validation", value: "Zod" },
      { name: "Cache", value: "Redis" },
      { name: "Graph DB", value: "Neo4j" },
      { name: "Database", value: "PostgreSQL" },
      { name: "Monitoring", value: "Prometheus + Grafana" },
    ],
    useCases: [
      "Autonomous threat detection and response",
      "Security operations automation",
      "Intelligence analysis and correlation",
      "Predictive security analytics",
      "Executive security reporting",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
