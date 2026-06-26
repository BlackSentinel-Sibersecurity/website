import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "BlackSentinel's development roadmap. Six phases from organization building to global enterprise platform.",
};

const phases = [
  {
    number: 1,
    title: "Foundation",
    status: "completed",
    items: [
      { text: "Build the BlackSentinel organization", completed: true },
      { text: "Brand identity", completed: true },
      { text: "Public GitHub repositories", completed: true },
      { text: "Website", completed: true },
      { text: "Initial documentation", completed: true },
    ],
  },
  {
    number: 2,
    title: "Core Security",
    status: "in-progress",
    items: [
      { text: "Security Automation", completed: false },
      { text: "Detection Engineering", completed: false },
      { text: "Threat Intelligence", completed: false },
      { text: "Security APIs", completed: false },
      { text: "Initial Open Source Projects", completed: false },
    ],
  },
  {
    number: 3,
    title: "Platform Core",
    status: "planned",
    items: [
      { text: "Security Platform", completed: false },
      { text: "Vulnerability Management", completed: false },
      { text: "Attack Surface Management", completed: false },
      { text: "Cloud Security", completed: false },
      { text: "Identity Security", completed: false },
    ],
  },
  {
    number: 4,
    title: "Detection & Response",
    status: "planned",
    items: [
      { text: "SIEM Platform", completed: false },
      { text: "Threat Detection", completed: false },
      { text: "Incident Response", completed: false },
      { text: "Security Analytics", completed: false },
      { text: "SOC Features", completed: false },
    ],
  },
  {
    number: 5,
    title: "Advanced Operations",
    status: "planned",
    items: [
      { text: "SOAR", completed: false },
      { text: "XDR", completed: false },
      { text: "EDR", completed: false },
      { text: "AI Security", completed: false },
      { text: "Threat Hunting", completed: false },
    ],
  },
  {
    number: 6,
    title: "Enterprise & Scale",
    status: "planned",
    items: [
      { text: "Enterprise Platform", completed: false },
      { text: "Cloud Native Security", completed: false },
      { text: "Risk Management", completed: false },
      { text: "Compliance", completed: false },
      { text: "Global Expansion", completed: false },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  completed: {
    label: "Completed",
    color: "border-primary/30 bg-primary/5",
    dot: "bg-primary",
  },
  "in-progress": {
    label: "In Progress",
    color: "border-accent/30 bg-accent/5",
    dot: "bg-accent",
  },
  planned: {
    label: "Planned",
    color: "border-border bg-surface-elevated",
    dot: "bg-text-muted",
  },
};

export default function RoadmapPage() {
  return (
    <div className="grid-bg">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary animate-fade-in-up">
              Development <span className="text-primary">Roadmap</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed animate-fade-in-up delay-100">
              Our roadmap spans six phases, from building the foundation to scaling
              a global enterprise platform. Each phase builds upon the previous,
              creating a comprehensive cybersecurity ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-16 border-t border-border-subtle bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-px" />

            <div className="space-y-8">
              {phases.map((phase) => {
                const config = statusConfig[phase.status];
                return (
                  <div key={phase.number} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background z-10">
                      <div className={`absolute inset-0 rounded-full ${config.dot}`} />
                    </div>

                    <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                      <div className={`${phase.number % 2 === 0 ? "md:col-start-2 md:pl-8" : "md:text-right md:pr-8"}`}>
                        <div className={`rounded-xl border p-6 ${config.color}`}>
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
                                {config.label}
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
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
