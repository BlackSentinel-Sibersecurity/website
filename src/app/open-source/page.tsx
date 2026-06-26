"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";

const openSourceProjects = [
  { name: "Security Automation", description: "Open-source tools for automating security workflows, incident response, and operational tasks.", category: "Automation" },
  { name: "Detection Rules", description: "Community-driven detection rules for SIEM and EDR platforms in Sigma and other formats.", category: "Detection" },
  { name: "Threat Intelligence", description: "Open-source threat intelligence feeds, IOC repositories, and enrichment tools.", category: "Intelligence" },
  { name: "Security APIs", description: "Standardized APIs for security tool integration and data exchange.", category: "API" },
  { name: "SOC Utilities", description: "Utilities and tools for Security Operations Centers to improve efficiency.", category: "SOC" },
  { name: "Pentesting Tools", description: "Open-source penetration testing tools and frameworks for security assessments.", category: "Offensive" },
  { name: "Cloud Security Tools", description: "Tools for assessing and improving cloud security across AWS, Azure, and GCP.", category: "Cloud" },
  { name: "Log Analysis", description: "Tools for parsing, normalizing, and analyzing security logs at scale.", category: "Analytics" },
  { name: "Detection Engineering", description: "Frameworks and tools for building, testing, and maintaining detection rules.", category: "Detection" },
  { name: "Blue Team Utilities", description: "Defensive security tools for monitoring, analysis, and incident response.", category: "Defense" },
];

const categoryColors: Record<string, string> = {
  Automation: "bg-primary/10 text-primary",
  Detection: "bg-accent/10 text-accent",
  Intelligence: "bg-warning/10 text-warning",
  API: "bg-purple-500/10 text-purple-400",
  SOC: "bg-blue-500/10 text-blue-400",
  Offensive: "bg-red-500/10 text-red-400",
  Cloud: "bg-cyan-500/10 text-cyan-400",
  Analytics: "bg-orange-500/10 text-orange-400",
  Defense: "bg-green-500/10 text-green-400",
};

export default function OpenSourcePage() {
  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Open <span className="text-primary">Source</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                BlackSentinel believes that collaboration drives innovation. We actively
                develop open-source projects that help security professionals and organizations
                improve their security posture.
              </p>
              <div className="mt-8">
                <a
                  href="https://github.com/BlackSentinel-Cibersecurity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-all hover:bg-surface-elevated hover:border-primary/30 hover:scale-105"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {openSourceProjects.map((project, i) => (
              <AnimatedSection key={project.name} delay={i * 50} direction="up">
                <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">{project.name}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[project.category] || "bg-surface text-text-muted"}`}>
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{project.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
