import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/contact", label: "Contact" },
  ],
  technology: [
    { href: "/products", label: "Products" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
  ],
  community: [
    { href: "/open-source", label: "Open Source" },
    { href: "https://github.com/BlackSentinel-Tech", label: "GitHub", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="BlackSentinel"
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">BLACK</span>
                <span className="text-primary">SENTINEL</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Building enterprise cybersecurity technologies that protect organizations through automation, AI, and advanced security engineering.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Technology</h3>
            <ul className="space-y-2">
              {footerLinks.technology.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} BlackSentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:business@blacksentinel.tech"
              className="text-xs text-text-muted hover:text-primary transition-colors"
            >
              business@blacksentinel.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
