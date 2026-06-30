"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getProductBySlug, products } from "@/data/products";

const categoryColors: Record<string, string> = {
  Platform: "bg-primary/10 text-primary border-primary/20",
  "Offensive Security": "bg-red-500/10 text-red-400 border-red-500/20",
  "Defense & Intelligence": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Access & Secrets": "bg-green-500/10 text-green-400 border-green-500/20",
  "Artificial Intelligence": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const statusColors: Record<string, string> = {
  available: "bg-primary/10 text-primary border-primary/20",
  beta: "bg-accent/10 text-accent border-accent/20",
  development: "bg-warning/10 text-warning border-warning/20",
};

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="grid-bg relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Product Not Found</h1>
          <p className="text-text-secondary mb-8">The product you are looking for does not exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-dim"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const otherProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      {/* Hero */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[product.category] || "bg-surface text-text-muted"}`}>
                {product.category}
              </span>
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusColors[product.status]}`}>
                {product.status === "available" ? "Available" : product.status === "beta" ? "Beta" : "In Development"}
              </span>
              <span className="text-xs text-text-muted">v{product.version}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
              {product.name}
            </h1>
            <p className="mt-2 text-xl text-primary font-medium">{product.subtitle}</p>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-3xl">
              {product.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Key Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated p-5">
                  <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-text-secondary">{highlight}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.stats.map((stat) => (
                <div key={stat.label} className="text-center rounded-xl border border-border bg-surface-elevated p-6">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Core Features</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {product.features.map((feature, i) => (
                <AnimatedSection key={feature.title} delay={i * 100}>
                  <div className="rounded-xl border border-border bg-surface-elevated p-6 h-full">
                    <h3 className="text-lg font-semibold text-text-primary mb-3">{feature.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">{feature.description}</p>
                    {feature.items && (
                      <ul className="space-y-2">
                        {feature.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                            <svg className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Modules & Components</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.modules.map((module, i) => (
                <AnimatedSection key={module.name} delay={i * 50} direction="up">
                  <div className="rounded-xl border border-border bg-surface-elevated p-5 h-full">
                    <h3 className="text-base font-semibold text-text-primary mb-2">{module.name}</h3>
                    <p className="text-xs text-text-muted leading-relaxed mb-3">{module.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {module.features.map((feat) => (
                        <span key={feat} className="inline-flex items-center rounded-md bg-primary/5 border border-primary/10 px-2 py-0.5 text-[10px] text-primary">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.techStack.map((tech) => (
                <div key={tech.name} className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
                  <span className="text-sm font-medium text-text-primary">{tech.name}</span>
                  <span className="text-sm text-text-muted">{tech.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Use Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.useCases.map((useCase, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary">{useCase}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border-subtle bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">
              Interested in {product.name}?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Contact us to learn more about how {product.name} can protect your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-dim hover:shadow-lg hover:shadow-primary/20"
              >
                Contact Sales
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-elevated hover:border-primary/30"
              >
                View All Products
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Other Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-primary font-medium">{p.subtitle}</p>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
