"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/contexts/LanguageContext";

const phases = [
  {
    number: 1,
    title: "Foundation",
    status: "completed",
    items: [
      { text: "Build the BlackSentinel organization", completed: true },
      { text: "Brand identity & design system", completed: true },
      { text: "Public GitHub repositories", completed: true },
      { text: "Corporate website", completed: true },
      { text: "Initial documentation", completed: true },
    ],
  },
  {
    number: 2,
    title: "Open Source Tools",
    status: "completed",
    items: [
      { text: "BlackSentinel OSS - Security Automation", completed: true },
      { text: "BlackSentinel OSS - Detection Rules (Sigma)", completed: true },
      { text: "BlackSentinel OSS - Threat Intelligence Feeds", completed: true },
      { text: "BlackSentinel OSS - Security APIs", completed: true },
      { text: "BlackSentinel OSS - SOC Utilities", completed: true },
      { text: "BlackSentinel OSS - Log Analysis Tools", completed: true },
      { text: "BlackSentinel OSS - Pentesting Framework", completed: true },
      { text: "BlackSentinel OSS - Cloud Security Tools", completed: true },
      { text: "BlackSentinel OSS - Detection Engineering", completed: true },
    ],
  },
  {
    number: 3,
    title: "BlackSentinel Platform",
    status: "completed",
    items: [
      { text: "BlackSentinel Nexus - Autonomous SIEM", completed: true },
      { text: "BlackSentinel Sentinel - Digital Sovereignty", completed: true },
      { text: "BlackSentinel Forge - Security Automation", completed: true },
      { text: "BlackSentinel Vision - Threat Intelligence", completed: true },
      { text: "BlackSentinel Guardian - Endpoint Protection", completed: true },
      { text: "BlackSentinel Command - Management Console", completed: true },
    ],
  },
  {
    number: 4,
    title: "Advanced Capabilities",
    status: "completed",
    items: [
      { text: "BlackSentinel Strike - Offensive Security", completed: true },
      { text: "BlackSentinel Pulse - Attack Surface Management", completed: true },
      { text: "BlackSentinel Vault - Secrets & Privileged Access", completed: true },
      { text: "BlackSentinel AI - AI Security Engine", completed: true },
      { text: "Multi-tenant Architecture", completed: true },
      { text: "Enterprise Documentation", completed: true },
    ],
  },
  {
    number: 5,
    title: "Enterprise & Operations",
    status: "in-progress",
    items: [
      { text: "Enterprise Platform Deployment", completed: true },
      { text: "Compliance Management (SOC2, ISO)", completed: true },
      { text: "Risk Management Module", completed: true },
      { text: "Customer Onboarding Portal", completed: false },
      { text: "Professional Services", completed: false },
      { text: "Channel Partners Program", completed: false },
    ],
  },
  {
    number: 6,
    title: "Growth & Expansion",
    status: "planned",
    items: [
      { text: "Global Expansion", completed: false },
      { text: "Sales Team", completed: false },
      { text: "Strategic Partnerships", completed: false },
      { text: "Series A Funding", completed: false },
      { text: "Board of Advisors", completed: false },
    ],
  },
];

const statusConfig: Record<string, { labelKey: string; color: string; dot: string }> = {
  completed: {
    labelKey: "completed",
    color: "border-primary/30 bg-primary/5",
    dot: "bg-primary",
  },
  "in-progress": {
    labelKey: "inProgress",
    color: "border-accent/30 bg-accent/5",
    dot: "bg-accent",
  },
  planned: {
    labelKey: "planned",
    color: "border-border bg-surface-elevated",
    dot: "bg-text-muted",
  },
};

export default function RoadmapPage() {
  const { t } = useLanguage();

  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Development <span className="text-primary">{t.roadmap.title}</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {t.roadmap.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-px" />

            <div className="space-y-8">
              {phases.map((phase, i) => {
                const config = statusConfig[phase.status];
                const statusLabel = t.roadmap.status[config.labelKey as keyof typeof t.roadmap.status];
                return (
                  <AnimatedSection key={phase.number} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className="relative">
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background z-10">
                        <div className={`absolute inset-0 rounded-full ${config.dot}`} />
                      </div>

                      <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                        <div className={`${phase.number % 2 === 0 ? "md:col-start-2 md:pl-8" : "md:text-right md:pr-8"}`}>
                          <div className={`rounded-xl border p-6 card-hover ${config.color}`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
                                {phase.number}
                              </span>
                              <div>
                                <h3 className="text-lg font-semibold text-text-primary">{phase.title}</h3>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                  phase.status === "completed" ? "text-primary" :
                                  phase.status === "in-progress" ? "text-accent" :
                                  "text-text-muted"
                                }`}>
                                  <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                                  {statusLabel}
                                </span>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              {phase.items.map((item) => (
                                <li key={item.text} className="flex items-center gap-2 text-sm">
                                  {item.completed ? (
                                    <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    <svg className="h-4 w-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )}
                                  <span className={item.completed ? "text-text-secondary" : "text-text-muted"}>
                                    {item.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
