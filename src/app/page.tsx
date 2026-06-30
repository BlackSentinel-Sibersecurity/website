"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Counter from "@/components/Counter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLanguage } from "@/contexts/LanguageContext";

const NeuralCore = dynamic(() => import("@/components/three/NeuralCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "20s" }} />
        <div className="absolute inset-4 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
        <div className="absolute inset-8 rounded-full border border-primary/5 animate-spin" style={{ animationDuration: "10s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  ),
});

function NeuralCoreFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "20s" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/50 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-primary/30 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-primary/20 rounded-full" />
        </div>
        <div className="absolute inset-4 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
        <div className="absolute inset-8 rounded-full border border-primary/5 animate-spin" style={{ animationDuration: "10s" }} />
        <div className="absolute inset-12 rounded-full bg-primary/5 blur-xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse shadow-lg shadow-primary/20" />
        </div>
      </div>
    </div>
  );
}

const IconSvg = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "grid":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "cpu":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { value: 20, suffix: "+", label: t.stats.threatIntel },
    { value: 15, suffix: "", label: t.stats.responseTime },
    { value: 10, suffix: "+", label: t.stats.uptime },
    { value: 6, suffix: "", label: t.stats.attacks },
  ];

  const featuredProducts = [
    {
      name: "BlackSentinel Nexus",
      description: "Next Generation Autonomous SIEM with real-time log analysis and AI-powered threat detection.",
      icon: "grid",
    },
    {
      name: "BlackSentinel Guardian",
      description: "Advanced endpoint protection with real-time monitoring, threat hunting, and automated remediation.",
      icon: "shield",
    },
    {
      name: "BlackSentinel AI",
      description: "AI-powered security engine providing autonomous threat detection and predictive defense.",
      icon: "cpu",
    },
    {
      name: "BlackSentinel Forge",
      description: "Security automation platform with no-code playbook builder and incident response orchestration.",
      icon: "cloud",
    },
  ];

  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "5s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {t.hero.badge}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary">
                  {t.hero.title1}
                  <span className="block text-primary">{t.hero.title2}</span>
                  {t.hero.title3}
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
                  {t.hero.description}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-dim hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                  >
                    {t.hero.exploreProducts}
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-elevated hover:border-primary/30 hover:scale-105"
                  >
                    {t.hero.learnMore}
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: 3D Neural Core */}
            <div className="relative h-[320px] sm:h-[420px] lg:h-[550px] xl:h-[600px]">
              <ErrorBoundary fallback={<NeuralCoreFallback />}>
                <NeuralCore />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border-subtle bg-surface relative">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                {t.mission.label}
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {t.mission.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 sm:py-32 bg-surface border-y border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                  {t.featuredProducts.title}
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-primary hover:text-primary-dim transition-colors inline-flex items-center gap-1"
              >
                {t.featuredProducts.viewAll}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 100} direction="up">
                <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover animate-border-glow hover:border-primary/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <IconSvg icon={product.icon} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{product.name}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{product.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                  {t.vision.label}
                </h2>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                  {t.vision.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl border border-border bg-surface-elevated p-8 animate-pulse-glow">
                <div className="grid grid-cols-2 gap-4">
                  {["Automation", "Artificial Intelligence", "Advanced Engineering", "Integrated Security"].map((item, i) => (
                    <AnimatedSection key={item} delay={i * 100}>
                      <div className="rounded-lg bg-surface border border-border-subtle p-4 text-center hover:border-primary/30 transition-colors">
                        <span className="text-sm font-medium text-text-primary">{item}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-surface border-y border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/BlackSentinel-Cibersecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-elevated hover:border-primary/30 hover:scale-105"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {t.nav.github}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-dim hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
              >
                {t.nav.getInTouch}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
