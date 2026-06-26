"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";

const projects = [
  { name: "Enterprise Security Platforms", description: "Building comprehensive security platforms that integrate SIEM, SOAR, XDR, and EDR capabilities into a unified ecosystem.", tags: ["Platform", "Enterprise", "Integration"], status: "active" },
  { name: "Security Automation", description: "Automating security workflows, incident response procedures, and operational tasks to accelerate security operations.", tags: ["Automation", "Workflows", "SOAR"], status: "active" },
  { name: "Security APIs", description: "Developing standardized APIs for security tool integration, data exchange, and platform interoperability.", tags: ["API", "Integration", "REST"], status: "active" },
  { name: "Detection Rules", description: "Creating and sharing detection rules for identifying malicious activity across SIEM and EDR platforms.", tags: ["Detection", "Rules", "Sigma"], status: "active" },
  { name: "AI Security", description: "Researching and developing AI-powered security agents for autonomous threat detection and response.", tags: ["AI", "Machine Learning", "Autonomous"], status: "active" },
  { name: "Cloud Security", description: "Building cloud-native security tools for multi-cloud environments including AWS, Azure, and GCP.", tags: ["Cloud", "AWS", "Azure", "GCP"], status: "active" },
  { name: "Open Security Standards", description: "Contributing to and promoting open standards for security data formats, protocols, and interoperability.", tags: ["Standards", "Open", "Interoperability"], status: "active" },
  { name: "Threat Detection", description: "Advanced threat detection engines using behavioral analysis, machine learning, and rule-based correlation.", tags: ["Threats", "Detection", "Behavioral"], status: "active" },
  { name: "Security Dashboards", description: "Building intuitive security dashboards for real-time visibility into security posture and incidents.", tags: ["Dashboard", "Visualization", "UI"], status: "active" },
  { name: "SOC Tooling", description: "Developing tools for Security Operations Centers to improve efficiency and reduce mean time to respond.", tags: ["SOC", "Operations", "Efficiency"], status: "active" },
  { name: "Infrastructure Security", description: "Securing the underlying infrastructure that powers modern enterprises, from networks to endpoints.", tags: ["Infrastructure", "Network", "Endpoints"], status: "active" },
];

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  planning: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-accent/10 text-accent border-accent/20",
};

export default function ProjectsPage() {
  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                <span className="text-primary">Projects</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                This organization hosts the technologies being developed by BlackSentinel.
                Projects range from production-ready software to experimental research
                initiatives.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <AnimatedSection key={project.name} delay={i * 50} direction="up">
                <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">{project.name}</h3>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-surface border border-border-subtle px-2 py-1 text-xs text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
