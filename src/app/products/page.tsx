"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";

const categoryLabels: Record<string, string> = {
  Platform: "BlackSentinel Platform",
  "Offensive Security": "Offensive Security",
  "Defense & Intelligence": "Defense & Intelligence",
  "Access & Secrets": "Access & Secrets",
  "Artificial Intelligence": "Artificial Intelligence",
};

const statusColors: Record<string, string> = {
  available: "bg-primary/10 text-primary border-primary/20",
  beta: "bg-accent/10 text-accent border-accent/20",
  development: "bg-warning/10 text-warning border-warning/20",
};

export default function ProductsPage() {
  const { t } = useLanguage();

  const groupedProducts = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, typeof products>
  );

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
            {Object.entries(groupedProducts).map(([category, categoryProducts], ci) => (
              <AnimatedSection key={category} delay={ci * 100}>
                <h2 className="text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-border-subtle">
                  {categoryLabels[category]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map((product, pi) => (
                    <AnimatedSection key={product.slug} delay={pi * 50} direction="up">
                      <Link href={`/products/${product.slug}`}>
                        <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30 h-full">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-xs text-primary font-medium mt-0.5">{product.subtitle}</p>
                            </div>
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[product.status]}`}>
                              {product.status === "available" ? "Available" : product.status === "beta" ? "Beta" : "In Dev"}
                            </span>
                          </div>
                          <p className="text-sm text-text-muted leading-relaxed mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-primary-dim transition-colors">
                            Learn more
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>
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
