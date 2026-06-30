"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/contexts/LanguageContext";

const productCategories = [
  {
    categoryKey: "platform" as const,
    products: [
      { name: "BlackSentinel Nexus", subtitle: "Next Generation Autonomous SIEM", description: "Autonomous security information and event management with real-time log analysis, AI-powered threat detection, and automated response capabilities.", status: "available" },
      { name: "BlackSentinel Sentinel", subtitle: "Autonomous Digital Sovereignty Platform", description: "Complete digital sovereignty platform ensuring data protection, compliance, and autonomous security operations across your infrastructure.", status: "available" },
      { name: "BlackSentinel Command", subtitle: "Unified Management Console", description: "Centralized management console providing unified visibility and control across all BlackSentinel security modules.", status: "available" },
    ],
  },
  {
    categoryKey: "defense" as const,
    products: [
      { name: "BlackSentinel Guardian", subtitle: "Endpoint Protection", description: "Advanced endpoint detection and response with real-time monitoring, threat hunting, and automated remediation.", status: "available" },
      { name: "BlackSentinel Vision", subtitle: "Threat Intelligence", description: "Comprehensive threat intelligence platform with IOC enrichment, automated correlation, and predictive analytics.", status: "available" },
      { name: "BlackSentinel Forge", subtitle: "Security Automation", description: "Workflow automation for security operations with no-code playbook builder and incident response orchestration.", status: "available" },
    ],
  },
  {
    categoryKey: "offensive" as const,
    products: [
      { name: "BlackSentinel Strike", subtitle: "Offensive Security Platform", description: "Penetration testing and red team platform with automated scanning, vulnerability exploitation, and reporting.", status: "available" },
      { name: "BlackSentinel Pulse", subtitle: "Attack Surface Management", description: "Continuous discovery and monitoring of your external attack surface to identify exposures and vulnerabilities.", status: "available" },
    ],
  },
  {
    categoryKey: "access" as const,
    products: [
      { name: "BlackSentinel Vault", subtitle: "Secrets & Privileged Access", description: "Secrets management and privileged access management with zero trust enforcement and audit logging.", status: "available" },
    ],
  },
  {
    categoryKey: "ai" as const,
    products: [
      { name: "BlackSentinel AI", subtitle: "AI Security Engine", description: "AI-powered security engine providing autonomous threat detection, behavioral analytics, and predictive defense.", status: "available" },
    ],
  },
];

const categoryLabels: Record<string, string> = {
  platform: "BlackSentinel Platform",
  defense: "Defense & Intelligence",
  offensive: "Offensive Security",
  access: "Access & Secrets",
  ai: "Artificial Intelligence",
};

const statusColors: Record<string, string> = {
  available: "bg-primary/10 text-primary border-primary/20",
  development: "bg-accent/10 text-accent border-accent/20",
  planned: "bg-warning/10 text-warning border-warning/20",
};

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                BlackSentinel <span className="text-primary">{t.products.title}</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {t.products.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {productCategories.map((category, ci) => (
              <AnimatedSection key={category.categoryKey} delay={ci * 100}>
                <h2 className="text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-border-subtle">
                  {categoryLabels[category.categoryKey]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.products.map((product, pi) => (
                    <AnimatedSection key={product.name} delay={pi * 50} direction="up">
                      <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-text-primary">{product.name}</h3>
                            <p className="text-xs text-primary font-medium mt-0.5">{product.subtitle}</p>
                          </div>
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[product.status]}`}>
                            {t.products.status[product.status as keyof typeof t.products.status]}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">{product.description}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
