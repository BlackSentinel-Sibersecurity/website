"use client";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import ContactForm from "@/components/ContactForm";

const contactChannels = [
  {
    label: "Business Inquiries",
    email: "BlackSentinel-tech@protonmail.com",
    description: "Partnerships, sales, and general business questions.",
    icon: "briefcase",
  },
  {
    label: "Research",
    email: "BlackSentinel-tech@protonmail.com",
    description: "Research collaborations, vulnerability disclosures, and technical discussions.",
    icon: "research",
  },
  {
    label: "GitHub",
    url: "https://github.com/BlackSentinel-Cibersecurity",
    description: "Open-source projects, issues, and contributions.",
    icon: "github",
  },
];

const ContactIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "briefcase":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "research":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "github":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function ContactPage() {
  return (
    <div className="grid-bg relative">
      <AnimatedBackground />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                We welcome collaboration, research partnerships, and business inquiries.
                Reach out to us through any of the channels below.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle bg-surface relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {contactChannels.map((channel, i) => (
              <AnimatedSection key={channel.label} delay={i * 100} direction="up">
                <div className="group rounded-xl border border-border bg-surface-elevated p-6 card-hover hover:border-primary/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <ContactIcon icon={channel.icon} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{channel.label}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{channel.description}</p>
                  {channel.email && (
                    <a
                      href={`mailto:${channel.email}`}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dim transition-colors"
                    >
                      {channel.email}
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                  {channel.url && (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dim transition-colors"
                    >
                      View on GitHub
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Request <span className="text-primary">Information</span>
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Interested in our cybersecurity solutions? Fill out the form and our team
                  will get back to you within 24-48 hours with detailed information about
                  how BlackSentinel can protect your organization.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Enterprise Security</h4>
                      <p className="text-sm text-text-secondary">Tailored solutions for organizations of all sizes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Rapid Response</h4>
                      <p className="text-sm text-text-secondary">24-48 hour response time for all inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Data Protection</h4>
                      <p className="text-sm text-text-secondary">Your information is encrypted and secured</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="rounded-xl border border-border bg-surface-elevated p-6 sm:p-8">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border-subtle relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Let&apos;s Build the Future of Security Together
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Whether you&apos;re interested in our technology, want to collaborate on
                research, or have a business inquiry, we&apos;d love to hear from you.
                Our team is committed to responding promptly to all inquiries.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
