import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore BlackSentinel's next-generation cybersecurity ecosystem. SIEM, SOAR, XDR, EDR, cloud security, AI agents, and more.",
};

const productCategories = [
  {
    category: "Security Platforms",
    products: [
      { name: "SIEM Platform", description: "Next-generation security information and event management with real-time log analysis and AI-powered threat detection.", status: "planned" },
      { name: "SOAR Platform", description: "Security orchestration, automation, and response for streamlined incident management and playbook execution.", status: "planned" },
      { name: "XDR", description: "Extended detection and response across endpoints, networks, cloud, and identity for unified threat detection.", status: "planned" },
      { name: "EDR", description: "Endpoint detection and response with real-time monitoring, threat hunting, and automated remediation.", status: "planned" },
      { name: "MDR", description: "Managed detection and response services combining technology with expert security operations.", status: "planned" },
    ],
  },
  {
    category: "Security Operations",
    products: [
      { name: "Vulnerability Management", description: "Comprehensive vulnerability scanning, prioritization, and remediation tracking across your infrastructure.", status: "planned" },
      { name: "Attack Surface Management", description: "Continuous discovery and monitoring of your external attack surface to identify exposures.", status: "planned" },
      { name: "Threat Intelligence Platform", description: "Aggregated threat intelligence feeds with IOC enrichment and automated correlation.", status: "planned" },
      { name: "Security Analytics", description: "Advanced analytics and reporting for security posture management and compliance.", status: "planned" },
      { name: "Security Monitoring", description: "24/7 security monitoring with real-time alerting and escalation workflows.", status: "planned" },
    ],
  },
  {
    category: "Cloud & Identity",
    products: [
      { name: "Cloud Security", description: "Cloud-native security for AWS, Azure, and GCP with CSPM, CWPP, and CIEM capabilities.", status: "planned" },
      { name: "Identity Security", description: "Identity and access management with zero trust enforcement and privileged access management.", status: "planned" },
      { name: "API Security", description: "API discovery, vulnerability detection, and runtime protection for modern applications.", status: "planned" },
    ],
  },
  {
    category: "AI & Automation",
    products: [
      { name: "AI Security Agents", description: "Autonomous security agents powered by AI for proactive threat hunting and response.", status: "planned" },
      { name: "Security Automation", description: "Workflow automation for repetitive security tasks with no-code playbook builder.", status: "planned" },
    ],
  },
  {
    category: "Incident Response",
    products: [
      { name: "Incident Response Platform", description: "Structured incident response with case management, evidence collection, and reporting.", status: "planned" },
      { name: "Digital Forensics", description: "Forensic analysis tools for disk, memory, network, and cloud investigations.", status: "planned" },
      { name: "Pentesting Platform", description: "Penetration testing management with automated scanning and manual testing workflows.", status: "planned" },
    ],
  },
  {
    category: "GRC",
    products: [
      { name: "Compliance Management", description: "Automated compliance monitoring and reporting for SOC 2, ISO 27001, NIST, and more.", status: "planned" },
      { name: "Risk Management", description: "Risk assessment, quantification, and tracking with integrated threat modeling.", status: "planned" },
    ],
  },
];

const statusColors: Record<string, string> = {
  planned: "bg-warning/10 text-warning border-warning/20",
  development: "bg-accent/10 text-accent border-accent/20",
  available: "bg-primary/10 text-primary border-primary/20",
};

export default function ProductsPage() {
  return (
    <div className="grid-bg">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary animate-fade-in-up">
              Products & <span className="text-primary">Platform</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed animate-fade-in-up delay-100">
              BlackSentinel is building a next-generation cybersecurity ecosystem.
              Our integrated platform covers the full spectrum of security operations.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 border-t border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {productCategories.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-border-subtle">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.products.map((product) => (
                    <div
                      key={product.name}
                      className="group rounded-xl border border-border bg-surface-elevated p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-text-primary">{product.name}</h3>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[product.status]}`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
