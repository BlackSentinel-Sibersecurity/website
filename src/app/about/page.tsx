"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";

const coreValues = [
  {
    title: "Security by Design",
    description: "Every product and feature is built with security as the foundational principle, not an afterthought.",
    icon: "shield",
  },
  {
    title: "Innovation First",
    description: "We push boundaries with cutting-edge AI, automation, and advanced engineering to stay ahead of threats.",
    icon: "lightbulb",
  },
  {
    title: "Transparency",
    description: "Open communication, honest practices, and clear documentation guide everything we do.",
    icon: "eye",
  },
  {
    title: "Engineering Excellence",
    description: "We maintain the highest standards in code quality, architecture, and product reliability.",
    icon: "code",
  },
  {
    title: "Continuous Learning",
    description: "The threat landscape evolves constantly, and so do we. Learning is embedded in our culture.",
    icon: "book",
  },
  {
    title: "Customer Trust",
    description: "Our customers trust us to protect their most critical assets. We earn that trust every day.",
    icon: "handshake",
  },
  {
    title: "Open Collaboration",
    description: "We believe the security community grows stronger through shared knowledge and collaboration.",
    icon: "users",
  },
  {
    title: "Responsible Disclosure",
    description: "We follow ethical practices in vulnerability research and disclosure to protect everyone.",
    icon: "alert",
  },
  {
    title: "Privacy by Default",
    description: "Privacy is not optional. We design systems that protect user data from the ground up.",
    icon: "lock",
  },
  {
    title: "Long-Term Thinking",
    description: "We build for the future, creating sustainable solutions that evolve with the threat landscape.",
    icon: "clock",
  },
];

const ValueIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.JSX.Element> = {
    shield: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    lightbulb: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    eye: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    code: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    book: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    handshake: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    users: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    alert: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    lock: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    clock: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  return icons[icon] || null;
};

export default function AboutPage() {
  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      {/* Hero */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                About <span className="text-primary">BlackSentinel</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                We are a cybersecurity technology company dedicated to building intelligent
                security platforms that protect organizations worldwide through automation,
                artificial intelligence, and advanced security engineering.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 border-y border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="rounded-2xl border border-border bg-surface-elevated p-8 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Mission</h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  To engineer intelligent cybersecurity technologies that enable organizations
                  to stay ahead of evolving cyber threats. We are committed to building autonomous
                  and semi-autonomous security platforms that simplify cybersecurity operations,
                  improve visibility, accelerate incident response, and reduce organizational risk.
                </p>
                <p className="mt-4 text-text-muted leading-relaxed">
                  Our goal is to make enterprise-grade cybersecurity accessible, scalable,
                  and driven by innovation.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl border border-border bg-surface-elevated p-8 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Vision</h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  To become one of the world&apos;s leading cybersecurity technology companies
                  by creating an integrated ecosystem of security platforms that protect
                  organizations through automation, artificial intelligence, and advanced
                  security engineering.
                </p>
                <p className="mt-4 text-text-muted leading-relaxed">
                  We envision a future where security teams spend less time reacting and
                  more time preventing attacks through intelligent, autonomous systems.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Core Values
              </h2>
              <p className="mt-4 text-text-secondary">
                The principles that guide our work and define our culture.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 50} direction="up">
                <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <ValueIcon icon={value.icon} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{value.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
